import * as babelParser from "@babel/parser";
import traverse from "@babel/traverse";

/**
 * Compute a lightweight structural hash from a single file's AST.
 */
function computeStructureSignature(code: string): string {
  try {
    const ast = babelParser.parse(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });

    let signature = "";
    traverse(ast, {
      enter(path) {
        signature += path.node.type + "-";
      },
    });

    return signature;
  } catch (err) {
    console.warn("⚠️ AST parse error:", (err as Error).message);
    return "";
  }
}

/**
 * Compare AST structures of the new project with existing ones.
 * Returns a normalized score (0–1).
 */
export async function analyzeASTStructure(
  fileMap: Record<string, string>,
  existingProjects: any[]
): Promise<number> {
  const validFiles = Object.entries(fileMap).filter(([name]) =>
    name.endsWith(".ts") || name.endsWith(".js") || name.endsWith(".tsx")
  );

  if (validFiles.length === 0) {
    console.warn("⚠️ No TS/JS files found for AST analysis");
    return 0;
  }

  console.log(`🧩 [AST] Parsing ${validFiles.length} files for structure...`);
  const newSignatures = validFiles.map(([_, content]) =>
    computeStructureSignature(content)
  );

  // Aggregate new project’s signature
  const newCombined = newSignatures.join("");

  // Compare with each existing project’s stored fingerprint/structure
  let maxScore = 0;
  for (const proj of existingProjects) {
    if (!proj.fingerprint) continue;
    const existingSig = proj.fingerprint;
    // basic Jaccard similarity
    const overlap = [...new Set(existingSig.split("-"))].filter(x =>
      newCombined.includes(x)
    );
    const score = overlap.length / Math.max(newCombined.length, 1);
    if (score > maxScore) maxScore = score;
  }

  console.log(`📊 [AST] Structural similarity score: ${maxScore.toFixed(4)}`);
  return maxScore;
}
