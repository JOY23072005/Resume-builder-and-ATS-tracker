import express from "express";

import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
  togglePublicResume,
  getPublicResume,
} from "../controllers/resume.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/resume",
  protectRoute,
  createResume
);

router.get(
  "/resume",
  protectRoute,
  getAllResumes
);

router.get(
  "/resume/:id",
  protectRoute,
  getResumeById
);

router.put(
  "/resume/:id",
  protectRoute,
  updateResume
);

router.delete(
  "/resume/:id",
  protectRoute,
  deleteResume
);

router.patch(
  "/resume/:id/public",
  protectRoute,
  togglePublicResume
);

router.get(
  "/r/:slug",
  getPublicResume
);

export default router;