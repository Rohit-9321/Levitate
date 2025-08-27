import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createVideo,
  listVideosByTopic,
  getVideo,
  deleteVideo
} from "../controllers/videoController.js";

const router = express.Router();

// Multer storage for notes files
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) =>
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

// public
router.get("/topic/:topicId", listVideosByTopic);
router.get("/:id", getVideo);

// admin
// multipart/form-data: topicId, title, url, notes (file)
router.post("/", protect, adminOnly, upload.single("notes"), createVideo);
router.delete("/:id", protect, adminOnly, deleteVideo);

export default router;
