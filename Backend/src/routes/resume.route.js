import express from "express";

import {
  createResume,
  getAllResumes,
  updateResume,
  deleteResume,
  togglePublicResume,
  getPublicResume,
  exportResume,
  getResumeByIdController,
  downloadPdf,
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
  getResumeByIdController
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

router.post(
  "/:id/export",
  protectRoute,
  exportResume
);

router.get(
  "/download/:fileId",
  protectRoute,
  downloadPdf
);

export default router;