import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  repoUrl: string;
  name: string;
  description?: string;
  status: "pending" | "processing" | "verified" | "flagged" | "duplicate";
  score?: number;
  fingerprint?: string;
  embedding?: number[];
  owner?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    repoUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "verified", "flagged", "duplicate"], // ✅ Added 'duplicate'
      default: "pending",
    },
    score: { type: Number, default: 0 },
    fingerprint: { type: String },
    embedding: { type: [Number], default: [] },
    owner: { type: String },
  },
  { timestamps: true }
);

ProjectSchema.index({ fingerprint: 1 });
ProjectSchema.index({ owner: 1 });
ProjectSchema.index({ createdAt: -1 });

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
