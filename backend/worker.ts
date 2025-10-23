// worker.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import "./src/lib/queue";

console.log("👷 Worker started, listening for jobs...");
