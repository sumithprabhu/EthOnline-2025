import crypto from "crypto";
import axios from "axios";
import AdmZip from "adm-zip";
import { join } from "path";
import { tmpdir } from "os";
import fs from "fs";
import { hashFileContent, generateASTSignature } from "../utils/hashUtils";
import { connectDB } from "../lib/db";
import Fingerprint from "../models/Fingerprint";
import { analyzeASTStructure } from "../utils/astUtils";
import { generateEmbedding, cosineSimilarity } from "../utils/embeddingUtils";
import Project from "../models/Project";

/**
 * 1️⃣ Generate fingerprint for repo (download, hash, Merkle)
 */
export async function generateFingerprint(projectId: string, repoUrl: string) {
  console.log("📦 Starting fingerprint generation...");
  await connectDB();

  const zipUrl = repoUrl.endsWith(".zip")
    ? repoUrl
    : `${repoUrl}/archive/refs/heads/main.zip`;

  console.log(`🌐 Downloading repo zip from: ${zipUrl}`);

  const tempPath = join(tmpdir(), `${projectId}.zip`);
  const writer = fs.createWriteStream(tempPath);
  const response = await axios({ url: zipUrl, method: "GET", responseType: "stream" });
  response.data.pipe(writer);

  await new Promise<void>((resolve) => writer.on("finish", () => resolve()));
  console.log("✅ Repo zip downloaded and saved locally");

  const zip = new AdmZip(tempPath);
  const entries = zip.getEntries();
  console.log(`📂 Found ${entries.length} files inside repo`);

  const fileHashes: Record<string, string> = {};
  for (const entry of entries) {
    // ✅ Include TS, JS, JSX, TSX, and Solidity
    if (
      entry.entryName.endsWith(".ts") ||
      entry.entryName.endsWith(".js") ||
      entry.entryName.endsWith(".tsx") ||
      entry.entryName.endsWith(".jsx") ||
      entry.entryName.endsWith(".sol")
    ) {
      const content = entry.getData().toString("utf-8");
      const fileHash = hashFileContent(content);
      const structureSig = generateASTSignature(content);
      const finalHash = crypto
        .createHash("sha256")
        .update(fileHash + structureSig)
        .digest("hex");

      fileHashes[entry.entryName] = finalHash;
      // console.log(`🧩 File hashed: ${entry.entryName} → ${finalHash.slice(0, 10)}...`);
    }
  }

  const merkleRoot = crypto
    .createHash("sha256")
    .update(Object.values(fileHashes).join(""))
    .digest("hex");

  console.log(`🌳 Computed Merkle root: ${merkleRoot}`);

  const fingerprint = await Fingerprint.create({
    projectId,
    fileHashes,
    merkleRoot,
  });

  fs.unlinkSync(tempPath);
  console.log("🧹 Cleaned temp zip file");
  return fingerprint;
}

/**
 * 2️⃣ Performs 4-layer similarity + legitimacy analysis
 */
export async function analyzeProject(
  projectId: string,
  repoFiles: Record<string, string>,
  userId?: string
) {
  console.log("🧠 [Analysis] Starting for project:", projectId);

  const merkleRoot = crypto
    .createHash("sha256")
    .update(Object.values(repoFiles).join(""))
    .digest("hex");
  console.log("🔍 [Layer 1] Merkle Root:", merkleRoot);

  const existing = await Project.find({ _id: { $ne: projectId } });
  console.log("📂 [Layer 1] Existing projects:", existing.length);

  // Layer 1 – Exact duplicate
  const exact = existing.find((p) => p.fingerprint === merkleRoot);
  if (exact) {
    console.log("🚨 Duplicate found:", exact._id);
    return { score: 100, status: "duplicate" };
  }

  // ✅ Fix: Prepare a proper file map for AST analysis
  console.log("🧩 [Layer 2] Analyzing AST...");
  let structureScore = 0;
  try {
    const validFiles: Record<string, string> = {};
    for (const [filename, content] of Object.entries(repoFiles)) {
      if (
        filename.endsWith(".ts") ||
        filename.endsWith(".js") ||
        filename.endsWith(".tsx") ||
        filename.endsWith(".jsx")
      ) {
        validFiles[filename] = content;
      }
    }

    structureScore = await analyzeASTStructure(validFiles, existing);
  } catch (e: unknown) {
    if (e instanceof Error) console.warn("⚠️ AST error:", e.message);
    else console.warn("⚠️ AST unknown error:", e);
  }
  console.log("📊 [Layer 2] Structural score:", structureScore);

  // Layer 3 – Semantic embedding comparison
  console.log("🧠 [Layer 3] Generating embedding...");
  const newEmbedding = await generateEmbedding(Object.values(repoFiles).join("\n"));
  let maxEmbeddingScore = 0;
  let matchedProjId: string | null = null;
  for (const proj of existing) {
    if (!proj.embedding) continue;
    const score = cosineSimilarity(newEmbedding, proj.embedding);
    if (score > maxEmbeddingScore) {
      maxEmbeddingScore = score;
      matchedProjId = proj._id.toString();
    }
  }
  console.log("📈 [Layer 3] Max similarity:", maxEmbeddingScore, "Matched project:", matchedProjId);

  // Layer 4 – Behavior timing penalty
  let behaviorPenalty = 0;
  if (userId) {
    const recent = await Project.findOne({ owner: userId }).sort({ createdAt: -1 });
    if (recent && Date.now() - recent.createdAt.getTime() < 60 * 60 * 1000) {
      behaviorPenalty = 5;
      console.log("⚠️ Rapid resubmission penalty:", behaviorPenalty);
    }
  }

  // Aggregate score
  const finalScore = Math.max(structureScore * 0.4 + maxEmbeddingScore * 60 - behaviorPenalty, 0);
  let status: "verified" | "needs_review" | "flagged" | "duplicate" = "verified";
  if (finalScore > 70) status = "flagged";
  else if (finalScore > 30) status = "needs_review";

  console.log("🎯 Final Score:", finalScore, "Status:", status);

  return { score: finalScore, status, embedding: newEmbedding };
}
