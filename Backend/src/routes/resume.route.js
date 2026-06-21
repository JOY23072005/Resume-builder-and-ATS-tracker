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
  "/",
  protectRoute,
  createResume
);

router.get(
  "/",
  protectRoute,
  getAllResumes
);

router.get(
  "/:id",
  protectRoute,
  getResumeById
);

router.put(
  "/:id",
  protectRoute,
  updateResume
);

router.delete(
  "/:id",
  protectRoute,
  deleteResume
);

router.patch(
  "/:id/public",
  protectRoute,
  togglePublicResume
);

router.get(
  "/r/:slug",
  getPublicResume
);

export default router;