// src/models/Fingerprint.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IFingerprint extends Document {
  projectId: string;
  fileHashes: Record<string, string>;
  merkleRoot: string;
  createdAt: Date;
}

const FingerprintSchema = new Schema<IFingerprint>(
  {
    projectId: { type: String, required: true },
    fileHashes: { type: Object, required: true },
    merkleRoot: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Fingerprint ||
  mongoose.model<IFingerprint>("Fingerprint", FingerprintSchema);
