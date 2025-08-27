import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createMessage, listMessagesForVideo } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:videoId", listMessagesForVideo);          // public read
router.post("/", protect, createMessage);               // {videoId, text}

export default router;
