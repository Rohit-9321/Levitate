import Video from "../models/Video.js";

export const createVideo = async (req, res) => {
  try {
    const { topicId, title, url } = req.body;
    const notesFile = req.file ? `/uploads/${req.file.filename}` : "";
    if (!topicId || !title || !url) {
      return res.status(400).json({ message: "topicId, title, url required" });
    }
    const video = await Video.create({ topic: topicId, title, url, notesFile });
    res.json(video);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const listVideosByTopic = async (req, res) => {
  const { topicId } = req.params;
  const videos = await Video.find({ topic: topicId }).sort({ createdAt: -1 });
  res.json(videos);
};

export const getVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) return res.status(404).json({ message: "Not found" });
  res.json(video);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  res.json({ success: true });
};
