// src/utils/hashUtils.ts
import crypto from "crypto";
import * as acorn from "acorn";

export function hashFileContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function generateASTSignature(code: string): string {
  try {
    const ast = acorn.parse(code, { ecmaVersion: "latest", sourceType: "module" });
    const nodeTypes = new Set<string>();
    walkAST(ast, (node) => nodeTypes.add(node.type));
    return Array.from(nodeTypes).sort().join("-");
  } catch {
    return "invalid-ast";
  }
}

function walkAST(node: any, callback: (n: any) => void) {
  callback(node);
  for (const key in node) {
    const child = node[key];
    if (child && typeof child === "object") {
      walkAST(child, callback);
    }
  }
}
