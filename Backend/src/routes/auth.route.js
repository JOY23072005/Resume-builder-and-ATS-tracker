import express from "express";
import {
  signup,
  login,
  sendVerificationOtp,
  verifyEmailOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  googleAuth
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post(
  "/send-verification-otp",
  sendVerificationOtp
);

router.post(
  "/verify-email",
  verifyEmailOtp
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-reset-otp",
  verifyResetOtp
);

router.post(
  "/reset-password",
  resetPassword
);

router.post(
  "/google",
  googleAuth
);

export default router;