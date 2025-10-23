// src/api/projects/[id]/status/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import Project from "../../../../../models/Project";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();
    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: project._id,
      name: project.name,
      status: project.status,
      score: project.score,
      createdAt: project.createdAt,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
