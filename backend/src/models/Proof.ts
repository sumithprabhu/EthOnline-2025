// src/models/Proof.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProof extends Document {
  projectId: string;
  merkleRoot: string;
  proofHash: string;
  txHash?: string;
  createdAt: Date;
}

const ProofSchema = new Schema<IProof>(
  {
    projectId: { type: String, required: true },
    merkleRoot: { type: String, required: true },
    proofHash: { type: String, required: true },
    txHash: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Proof ||
  mongoose.model<IProof>("Proof", ProofSchema);
