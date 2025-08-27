import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createTopic,
  listTopicsBySubject,
  deleteTopic
} from "../controllers/topicController.js";

const router = express.Router();

router.get("/:subjectId", listTopicsBySubject); // public
router.post("/", protect, adminOnly, createTopic); // body: {subjectId, title}
router.delete("/:id", protect, adminOnly, deleteTopic);

export default router;
