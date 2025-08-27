import Topic from "../models/Topic.js";
import Video from "../models/Video.js";

export const createTopic = async (req, res) => {
  const { subjectId, title } = req.body;
  if (!subjectId || !title) return res.status(400).json({ message: "subjectId and title required" });
  const topic = await Topic.create({ subject: subjectId, title });
  res.json(topic);
};

export const listTopicsBySubject = async (req, res) => {
  const { subjectId } = req.params;
  const topics = await Topic.find({ subject: subjectId }).sort({ createdAt: -1 });
  res.json(topics);
};

export const deleteTopic = async (req, res) => {
  const { id } = req.params;
  await Video.deleteMany({ topic: id });
  await Topic.findByIdAndDelete(id);
  res.json({ success: true });
};
