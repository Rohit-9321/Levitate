import Test from "../models/Test.js";

// Admin: create test
export const createTest = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { videoId } = req.params;
    const { questions } = req.body;

    const test = await Test.create({ video: videoId, questions });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: get test for a video
export const getTest = async (req, res) => {
  try {
    const { videoId } = req.params;
    const test = await Test.findOne({ video: videoId });
    if (!test) return res.status(404).json({ message: "No test found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: submit answers
export const submitTest = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { answers } = req.body; // { 0: "selectedAnswer", 1: "selectedAnswer" }

    const test = await Test.findOne({ video: videoId });
    if (!test) return res.status(404).json({ message: "No test found" });

    let score = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    res.json({ total: test.questions.length, score });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
