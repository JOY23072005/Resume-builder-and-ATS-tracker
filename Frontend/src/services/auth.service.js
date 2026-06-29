import api from "./api";
import toast from "react-hot-toast";

const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    "Something went wrong";

  toast.error(message);

  throw error;
};

export const signup = async (data) => {
  try {
    const res = await api.post(
      "/auth/signup",
      data
    );

    toast.success(res.data.message);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const login = async (data) => {
  try {
    const res = await api.post(
      "/auth/login",
      data
    );

    toast.success(res.data.message);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const sendVerificationOtp = async (
  data
) => {
  try {
    const res = await api.post(
      "/auth/send-verification-otp",
      data
    );

    toast.success(res.data.message);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const verifyEmail = async (data) => {
  try {
    const res = await api.post(
      "/auth/verify-email",
      data
    );

    toast.success(res.data.message);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (
  data
) => {
  try {
    const res = await api.post(
      "/auth/forgot-password",
      data
    );

    toast.success(res.data.message);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const verifyResetOtp = async (
  data
) => {
  try {
    const res = await api.post(
      "/auth/verify-reset-otp",
      data
    );

    toast.success("OTP verified");

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const resetPassword = async (
  data
) => {
  try {
    const res = await api.post(
      "/auth/reset-password",
      data
    );

    toast.success(res.data.message);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const logoutme = async () =>{
  try {
    const res = await api.post(
      "/auth/logout",
    );

    return res;
  } catch (error) {
    handleError(error);
  }
}

export const getMe = async () => {
  try {
    const res = await api.get(
      "/user/me",
    );

    return res;
  } catch (error) {
    if (error.response?.status === 401) {
      return null; // expected
    }
    handleError(error);
  }
};