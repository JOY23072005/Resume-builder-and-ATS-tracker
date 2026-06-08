import express from "express";

import { getCurrentUser } from "../controllers/user.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protectRoute, getCurrentUser);

export default router;