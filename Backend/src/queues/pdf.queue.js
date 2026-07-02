import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const pdfQueue = new Queue(
  "pdf-generation",
  {
    connection: redis,
  }
);