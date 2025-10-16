// src/utils/embeddingUtils.ts
import crypto from "crypto";

/**
 * Temporary local embedding generator.
 * For production, replace with OpenAI or CodeBERT embeddings.
 */
export async function generateEmbedding(code: string): Promise<string> {
  // Simple hash-based pseudo-embedding (placeholder)
  return crypto.createHash("sha256").update(code).digest("hex");
}

/**
 * Compute cosine similarity between two embeddings (as hex strings)
 */
export function cosineSimilarity(hashA: string, hashB: string): number {
  const a = Buffer.from(hashA, "hex");
  const b = Buffer.from(hashB, "hex");
  let dot = 0, magA = 0, magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
