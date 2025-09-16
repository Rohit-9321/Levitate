import Topic from "../models/Topic.js";
import Video from "../models/Video.js";

import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  try {
    const { title, description } = req.body; // ✅ must match schema

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newSubject = new Subject({ title, description });
    await newSubject.save();

    res.status(201).json(newSubject);
  } catch (err) {
    console.error("❌ Error creating subject:", err);
    res.status(400).json({ message: err.message });
  }
};

export const listSubjects = async (req, res) => {
  const subjects = await Subject.find().sort({ createdAt: -1 });
  res.json(subjects);
};

export const getSubjectDetails = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findById(id);
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topics = await Topic.find({ subject: id }).sort({ createdAt: -1 });
  // videos are fetched by topic on Topic page
  res.json({ subject, topics });
};

export const deleteSubject = async (req, res) => {
  const { id } = req.params;
  await Video.deleteMany({ topic: { $in: (await Topic.find({ subject: id })).map(t => t._id) } });
  await Topic.deleteMany({ subject: id });
  await Subject.findByIdAndDelete(id);
  res.json({ success: true });
};
