import { Worker } from "bullmq";
import { redisWorker } from "../config/redis.js";
import { generatePdf } from "../services/pdf.service.js";
import { getResumeById } from "../services/resume.service.js";
import { classicTemplate } from "../templates/classic.template.js";
import { modernTemplate } from "../templates/modern.template.js";


const worker = new Worker(

  "pdf-generation",

  async (job) => {

        console.log(
        "Processing Job:",
        job.id
        );

        console.log("fetching resume...");

        const resume = await getResumeById(
                            job.data.resumeId,
                            job.data.userId
                        );

        // console.log(resume);
        let html;

        switch (resume.template) {
            case "classic":
                html = classicTemplate(resume);
                break;

            case "modern":
                html = modernTemplate(resume);
                break;

            default:
                html = classicTemplate(resume);
        }

        const pdfPath = await generatePdf({html,fileName : resume.id});

        console.log(pdfPath);

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