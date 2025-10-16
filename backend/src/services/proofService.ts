// src/services/proofService.ts
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import Proof from "@/models/Proof";
import Fingerprint from "@/models/Fingerprint";

export async function generateProof(projectId: string) {
  await connectDB();
  const fingerprint = await Fingerprint.findOne({ projectId });
  if (!fingerprint) throw new Error("Fingerprint not found");

  // Step 1: Create proof hash (simulate zk proof hash)
  const proofHash = crypto
    .createHash("sha256")
    .update(fingerprint.merkleRoot + Date.now().toString())
    .digest("hex");

  // Step 2: (optional) send to blockchain
  // In next phase we will integrate smart contract verification here

  const proof = await Proof.create({
    projectId,
    merkleRoot: fingerprint.merkleRoot,
    proofHash,
  });

  return proof;
}

export async function getProofByProjectId(projectId: string) {
  await connectDB();
  return Proof.findOne({ projectId });
}
