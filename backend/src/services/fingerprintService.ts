// src/services/fingerprintService.ts
import crypto from "crypto";
import axios from "axios";
import AdmZip from "adm-zip";
import { join } from "path";
import { tmpdir } from "os";
import fs from "fs";
import { hashFileContent, generateASTSignature } from "@/utils/hashUtils";
import { connectDB } from "@/lib/db";
import Fingerprint from "@/models/Fingerprint";

export async function generateFingerprint(projectId: string, repoUrl: string) {
  await connectDB();

  const zipUrl = repoUrl.endsWith(".zip")
    ? repoUrl
    : `${repoUrl}/archive/refs/heads/main.zip`;

  const tempPath = join(tmpdir(), `${projectId}.zip`);
  const writer = fs.createWriteStream(tempPath);
  const response = await axios({ url: zipUrl, method: "GET", responseType: "stream" });
  response.data.pipe(writer);

  await new Promise((resolve) => writer.on("finish", resolve));

  const zip = new AdmZip(tempPath);
  const entries = zip.getEntries();

  const fileHashes: Record<string, string> = {};
  for (const entry of entries) {
    if (entry.entryName.endsWith(".ts") || entry.entryName.endsWith(".sol")) {
      const content = entry.getData().toString("utf-8");
      const fileHash = hashFileContent(content);
      const structureSig = generateASTSignature(content);
      fileHashes[entry.entryName] = crypto
        .createHash("sha256")
        .update(fileHash + structureSig)
        .digest("hex");
    }
  }

  const merkleRoot = crypto
    .createHash("sha256")
    .update(Object.values(fileHashes).join(""))
    .digest("hex");

  const fingerprint = await Fingerprint.create({
    projectId,
    fileHashes,
    merkleRoot,
  });

  fs.unlinkSync(tempPath);
  return fingerprint;
}
