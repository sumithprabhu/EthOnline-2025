// src/types/index.d.ts

export interface ProjectFingerprint {
    fileHashes: Record<string, string>;
    merkleRoot: string;
  }
  
  export interface ProjectScore {
    score: number;
    status: "pending" | "processing" | "verified" | "flagged";
  }
  
  export interface ProofRecord {
    projectId: string;
    merkleRoot: string;
    proofHash: string;
    txHash?: string;
    createdAt: Date;
  }
  