import Subject from "../models/Subject.js";
import Topic from "../models/Topic.js";
import Video from "../models/Video.js";

export const createSubject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const subject = await Subject.create({ title, description });
    res.json(subject);
  } catch (e) {
    res.status(400).json({ message: e.message });
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
