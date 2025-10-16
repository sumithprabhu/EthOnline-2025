// src/services/scoreService.ts
import Fingerprint from "@/models/Fingerprint";
import Project from "@/models/Project";
import { connectDB } from "@/lib/db";

export async function calculateSimilarity(projectId: string) {
  await connectDB();

  const current = await Fingerprint.findOne({ projectId });
  if (!current) return null;

  const all = await Fingerprint.find({ projectId: { $ne: projectId } });

  let maxScore = 0;
  for (const other of all) {
    const sim = jaccardSimilarity(current.fileHashes, other.fileHashes);
    if (sim > maxScore) maxScore = sim;
  }

  const project = await Project.findById(projectId);
  if (!project) return null;

  project.score = maxScore;
  project.status = maxScore > 0.8 ? "flagged" : "verified";
  await project.save();

  return { score: maxScore, status: project.status };
}

function jaccardSimilarity(a: Record<string, string>, b: Record<string, string>) {
  const aVals = Object.values(a);
  const bVals = Object.values(b);
  const intersection = aVals.filter((h) => bVals.includes(h));
  const union = new Set([...aVals, ...bVals]);
  return intersection.length / union.size;
}
