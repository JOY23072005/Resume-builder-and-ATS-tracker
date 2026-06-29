import api from "./api";
import toast from "react-hot-toast";

const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    "Something went wrong";

  toast.error(message);
  throw error;
};

export const createResume = async (data = {}) => {
  try {
    const res = await api.post("/resume", data);

    toast.success("Resume created successfully");

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAllResumes = async () => {
  try {
    const res = await api.get("/resume");

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getResumeById = async (id) => {
  try {
    const res = await api.get(`/resume/${id}`);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const updateResume = async (id, data) => {
  try {
    const res = await api.put(`/resume/${id}`, data);

    toast.success("Resume updated successfully");

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const deleteResume = async (id) => {
  try {
    const res = await api.delete(`/resume/${id}`);

    toast.success("Resume deleted successfully");

    return res;
  } catch (error) {
    handleError(error);
  }
};