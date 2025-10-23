// src/lib/queue.ts
import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { processProject } from "../workers/processFingerprint";
import { config } from "./config";
import { RedisOptions } from "ioredis";

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null, // ✅ Required by BullMQ
};

const connection = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379", redisOptions);

// Main job queue
export const projectQueue = new Queue("projectQueue", { connection });

// Background worker
export const projectWorker = new Worker(
  "projectQueue",
  async (job: Job) => {
    const { projectId, repoUrl } = job.data;
    console.log(`🧠 Worker started for Project ${projectId}`);
    await processProject(projectId, repoUrl);
  },
  { connection }
);

projectWorker.on("completed", (job) =>
  console.log(`✅ Job ${job.id} completed successfully`)
);

projectWorker.on("failed", (job, err) =>
  console.error(`❌ Job ${job?.id} failed:`, err)
);
