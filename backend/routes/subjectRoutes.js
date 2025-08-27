import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createSubject,
  listSubjects,
  getSubjectDetails,
  deleteSubject
} from "../controllers/subjectController.js";

const router = express.Router();

router.get("/", listSubjects); // public list (for Home)
router.get("/:id", getSubjectDetails); // public detail page (topics)
router.post("/", protect, adminOnly, createSubject);
router.delete("/:id", protect, adminOnly, deleteSubject);

export default router;
