// src/services/projectService.ts
import Project from "../models/Project";
import { connectDB } from "../lib/db";

export async function updateProjectStatus(
  projectId: string,
  status: "pending" | "processing" | "verified" | "flagged",
  score?: number
) {
  await connectDB();
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  project.status = status;
  if (score !== undefined) project.score = score;

  await project.save();
  return project;
}

export async function getProjectById(projectId: string) {
  await connectDB();
  return Project.findById(projectId);
}
