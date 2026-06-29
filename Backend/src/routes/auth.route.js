import express from "express";
import {
  signup,
  login,
  sendVerificationOtp,
  verifyEmailOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  googleLogin,
  logout
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

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
  googleLogin
);

router.post(
  "/logout",
  protectRoute,
  logout
);

export default router;