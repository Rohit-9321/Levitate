import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },        // YouTube URL
    notesFile: { type: String, default: "" }      // saved file path (if any)
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
