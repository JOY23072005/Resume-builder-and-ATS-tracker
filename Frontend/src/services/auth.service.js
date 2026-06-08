import api from "./api";

export const signup = (data) =>
  api.post("/auth/signup", data);

export const login = (data) =>
  api.post("/auth/login", data);

export const sendVerificationOtp = (data) =>
  api.post("/auth/send-verification-otp", data);

export const verifyEmail = (data) =>
  api.post("/auth/verify-email", data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const verifyResetOtp = (data) =>
  api.post("/auth/verify-reset-otp", data);

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data);

export const getMe = (token) =>
  api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });