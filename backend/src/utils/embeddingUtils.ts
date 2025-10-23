import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const generateEmbedding = async (code: string): Promise<number[]> => {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: code.slice(0, 8000),
  });
  return res.data[0].embedding;
};

export const cosineSimilarity = (a: number[], b: number[]) => {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return (dot / (normA * normB)) * 100;
};
