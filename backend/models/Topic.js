import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // ✅ new
});

export default mongoose.model("Topic", topicSchema);
