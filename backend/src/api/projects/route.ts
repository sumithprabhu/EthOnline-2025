// src/api/projects/route.ts
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    await connectDB();
    
    // For now, we'll return all projects
    // In a real app, you'd filter by user ID or add authentication
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .select('name repoUrl description status score createdAt updatedAt');

    return NextResponse.json({
      projects: projects.map(project => ({
        id: project._id,
        name: project.name,
        repoUrl: project.repoUrl,
        description: project.description,
        status: project.status,
        score: project.score,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }))
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
