// src/api/projects/register/route.ts
import { NextResponse } from "next/server";
import Project from "@/models/Project";
import { connectDB } from "@/lib/db";
import { projectQueue } from "@/lib/queue";

export async function POST(req: Request) {
  try {
    const { repoUrl, name, description } = await req.json();

    if (!repoUrl || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await connectDB();

    const project = await Project.create({
      repoUrl,
      name,
      description,
      status: "pending",
    });

    // enqueue job for processing
    await projectQueue.add("processProject", {
      projectId: project._id,
      repoUrl: project.repoUrl,
    });

    return NextResponse.json(
      {
        message: "Project registered successfully",
        id: project._id,
        status: "queued",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
