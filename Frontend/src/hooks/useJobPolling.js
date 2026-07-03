import { useRef } from "react";
import { getJobStatus } from "../services/job.service";
import { useLoading } from "../context/LoadingContext";
import { downloadPdf } from "../services/resume.service";

export default function useJobPolling() {

  const intervalRef = useRef(null);

  const {
    startLoading,
    stopLoading,
    setProgress,
    setMessage,
  } = useLoading();

  const startPolling = (jobId) => {

    startLoading("Preparing...");

    intervalRef.current = setInterval(async () => {

      try {

        const res = await getJobStatus(jobId);

        const {
          state,
          progress,
          result,
        } = res.data;

        if (progress) {

          setProgress(progress.progress);

          setMessage(progress.message);

        }

        if (state === "completed") {

          clearInterval(intervalRef.current);

          stopLoading();

          await downloadPdf(result.fileId);

        }

        if (state === "failed") {

          clearInterval(intervalRef.current);

          stopLoading();

        }

      } catch (err) {

        console.error(err);

        clearInterval(intervalRef.current);

        stopLoading();

      }

    }, 1000);

  };

  return {
    startPolling,
  };

}