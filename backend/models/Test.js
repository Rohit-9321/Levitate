import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }], // multiple choices
  answer: { type: String, required: true }, // correct answer
});

const testSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  questions: [questionSchema],
});

export default mongoose.model("Test", testSchema);
