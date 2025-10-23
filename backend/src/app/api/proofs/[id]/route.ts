// src/api/proofs/[id]/route.ts
import { NextResponse } from "next/server";
import { getProofByProjectId } from "../../../../services/proofService";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const proof = await getProofByProjectId(params.id);
    if (!proof) {
      return NextResponse.json({ error: "Proof not found" }, { status: 404 });
    }

    return NextResponse.json({
      projectId: proof.projectId,
      merkleRoot: proof.merkleRoot,
      proofHash: proof.proofHash,
      txHash: proof.txHash,
      createdAt: proof.createdAt,
    });
  } catch (error) {
    console.error("Error fetching proof:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
