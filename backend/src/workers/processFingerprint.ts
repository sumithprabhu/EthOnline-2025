import Project from "../models/Project";
import { generateFingerprint, analyzeProject } from "../services/fingerprintService";
import { connectDB } from "../lib/db";

export async function processProject(projectId: string, repoUrl: string) {
  try {
    console.log(`🔄 Processing project ${projectId}`);
    await connectDB();

    console.log("📦 Starting fingerprint generation...");
    const fingerprint = await generateFingerprint(projectId, repoUrl);
    console.log("✅ Fingerprint generated:", fingerprint.merkleRoot);

    const project = await Project.findById(projectId);
    if (!project) {
      console.warn("⚠️ Project not found in DB, skipping update.");
      return;
    }

    // Save fingerprint into Project
    project.fingerprint = fingerprint.merkleRoot;
    await project.save();
    console.log("💾 Fingerprint saved in Project:", fingerprint.merkleRoot);

    // Combine repo files for analysis
    const repoFiles = fingerprint.fileHashes;
    const result = await analyzeProject(projectId, repoFiles, project.owner?.toString());
    console.log("📊 4-Layer Analysis Result:", result);

    // Save embedding + score + status into Project
    if (result.embedding) project.embedding = result.embedding;
    project.score = result.score;
    project.status = result.status;
    await project.save();

    console.log(`✅ Job completed for Project ${projectId} | Status: ${result.status}`);
  } catch (err) {
    console.error("❌ Error processing project:", err);
  }
}
