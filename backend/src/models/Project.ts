// src/models/Project.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  repoUrl: string;
  name: string;
  description: string;
  status: "pending" | "processing" | "verified" | "flagged";
  score?: number;
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
      enum: ["pending", "processing", "verified", "flagged"],
      default: "pending",
    },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
