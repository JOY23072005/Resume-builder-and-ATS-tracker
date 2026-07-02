import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getJobStatus } from "../controllers/jobs.controller.js";

const router = express.Router();

router.get('/:jobId',protectRoute,getJobStatus);

export default router;