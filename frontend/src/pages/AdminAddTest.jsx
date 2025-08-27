import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminAddTest() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleChange = (qIdx, field, value) => {
    const updated = [...questions];
    if (field === "question") updated[qIdx].question = value;
    else if (field === "answer") updated[qIdx].answer = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const saveTest = async () => {
    try {
      await api.post(`/tests/${videoId}`, { questions });
      alert("Test created successfully!");
      navigate("/admin/videos");
    } catch (err) {
      alert("Error creating test");
    }
  };

  return (
    <div className="card">
      <h2>Create Test for Video</h2>

      {questions.map((q, qIdx) => (
        <div key={qIdx} className="card" style={{ marginBottom: 20 }}>
          <input
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleChange(qIdx, "question", e.target.value)}
          />

          {q.options.map((opt, oIdx) => (
            <input
              key={oIdx}
              placeholder={`Option ${oIdx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
              style={{ display: "block", marginTop: 5 }}
            />
          ))}

          <input
            placeholder="Correct Answer"
            value={q.answer}
            onChange={(e) => handleChange(qIdx, "answer", e.target.value)}
            style={{ marginTop: 10 }}
          />
        </div>
      ))}

      <button onClick={addQuestion}>+ Add Another Question</button>
      <br />
      <button onClick={saveTest} style={{ marginTop: 20 }}>
        Save Test
      </button>
    </div>
  );
}
