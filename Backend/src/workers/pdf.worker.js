import { Worker } from "bullmq";
import { redisWorker } from "../config/redis.js";
import { generatePdf } from "../services/pdf.service.js";
import { getResumeById } from "../services/resume.service.js";
import { classicTemplate } from "../templates/classic.template.js";
import { modernTemplate } from "../templates/modern.template.js";
import path from "path";
import { closeBrowser } from "../services/browser.service.js";

const updateProgress = async (
    job,
    progress,
    message
)=>{

    await job.updateProgress({
        progress,
        message,
    });

}

const worker = new Worker(

  "pdf-generation",

  async (job) => {

    try{
        console.log(
        "Processing Job:",
        job.id
        );
        await updateProgress(
            job,
            10,
            "Fetching Resume..."
        );
        // console.log("fetching resume...");


        const resume = await getResumeById(
                            job.data.resumeId,
                            job.data.userId
                        );

        await updateProgress(
            job,
            30,
            "Preparing Data..."
        );
        // console.log(resume);

        let html;

        await updateProgress(
            job,
            60,
            "Rendering Template..."
        );

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

        await updateProgress(
            job,
            90,
            "Generating PDF..."
        );

        const pdfPath = await generatePdf({html,fileName : resume.id});

        
        // console.log(pdfPath);
        await updateProgress(
            job,
            100,
            "Completed"
        );

        return {
        success: true,
        fileId: path.basename(pdfPath)
        };
    }catch(err){
      
      console.error(err);

      throw err;
    
    }
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

process.on("SIGINT", async () => {
    await closeBrowser();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await closeBrowser();
    process.exit(0);
});

console.log("PDF Worker Started");

console.log(
  "PDF Worker Started"
);