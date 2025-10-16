// src/lib/config.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const config = {
  MONGO_URI: process.env.MONGO_URI || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
};
