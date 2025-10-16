// src/lib/db.ts
import mongoose from "mongoose";
import { config } from "./config";

if (!config.MONGO_URI) {
  throw new Error("❌ MONGO_URI not found in environment variables");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(config.MONGO_URI, {
      dbName: "proof_of_build",
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
