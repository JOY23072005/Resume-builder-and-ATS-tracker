import api from "./api";

export const getJobStatus = (jobId) =>
  api.get(`/job/${jobId}`);