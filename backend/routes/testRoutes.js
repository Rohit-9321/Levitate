import express from "express";
import { createTest, getTest, submitTest } from "../controllers/testController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin: create test for a video
router.post("/:videoId", protect, createTest);

// Student: get test for a video
router.get("/:videoId", protect, getTest);

// Student: submit answers
router.post("/:videoId/submit", protect, submitTest);

export default router;
