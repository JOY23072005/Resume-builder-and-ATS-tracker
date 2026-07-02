import { Worker } from "bullmq";
import { redisWorker } from "../config/redis.js";

const worker = new Worker(

  "pdf-generation",

  async (job) => {

    console.log(
      "Processing Job:",
      job.id
    );

    console.log(job.data);

    // Later:
    // Fetch Resume
    // Generate HTML
    // Puppeteer PDF

    return {
      success: true,
    };

  },

  {
    connection: redisWorker,
  }

);

worker.on(
  "completed",
  (job) => {

    console.log(
      `Job ${job.id} completed`
    );

  }
);

worker.on(
  "failed",
  (job, err) => {

    console.log(
      `Job ${job.id} failed`
    );

    console.error(err);

  }
);

console.log(
  "PDF Worker Started"
);