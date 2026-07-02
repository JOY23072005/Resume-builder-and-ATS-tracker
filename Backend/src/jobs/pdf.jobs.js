import { pdfQueue } from "../queues/pdf.queue.js";

export const addPdfJob = async (
  resumeId,
  userId
) => {

  const job = await pdfQueue.add(
    "generate-pdf",
    {
      resumeId,
      userId,
    },
    {
      attempts: 3,
      removeOnComplete: 100,
      removeOnFail: 100,
    }
  );

  return job;
};