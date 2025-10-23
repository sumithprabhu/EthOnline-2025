// src/lib/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // make sure env is loaded before connecting

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("❌ MONGO_URI not found in environment variables");
    throw new Error("❌ MONGO_URI not found in environment variables");
  }

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(mongoUri, {
        dbName: "proof_of_build",
      });

    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};
