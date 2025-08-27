import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const { videoId, text } = req.body;
  if (!videoId || !text) return res.status(400).json({ message: "videoId and text required" });
  const msg = await Message.create({ video: videoId, user: req.user._id, text });
  res.json(await msg.populate("user", "name role"));
};

export const listMessagesForVideo = async (req, res) => {
  const { videoId } = req.params;
  const msgs = await Message.find({ video: videoId })
    .populate("user", "name role")
    .sort({ createdAt: -1 });
  res.json(msgs);
};
