import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
