// src/workers/processFingerprint.ts
import Project from "@/models/Project";
import { generateFingerprint } from "@/services/fingerprintService";
import { calculateSimilarity } from "@/services/scoreService";

export async function processProject(projectId: string, repoUrl: string) {
  try {
    console.log(`🔄 Processing project ${projectId}`);
    const fingerprint = await generateFingerprint(projectId, repoUrl);
    console.log("✅ Fingerprint generated:", fingerprint.merkleRoot);

    const score = await calculateSimilarity(projectId);
    console.log("📊 Similarity score:", score);
  } catch (err) {
    console.error("❌ Error processing project:", err);
  }
}
