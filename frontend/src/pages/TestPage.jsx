import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function TestPage() {
  const { videoId } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/tests/${videoId}`).then((res) => setTest(res.data));
  }, [videoId]);

  const submit = async () => {
    const res = await api.post(`/tests/${videoId}/submit`, { answers });
    setResult(res.data);
  };

  if (!test) return <p>No test available for this lecture.</p>;

  return (
    <div className="card">
      <h2>Lecture Test</h2>
      {test.questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 15 }}>
          <p><strong>{q.question}</strong></p>
          {q.options.map((opt, j) => (
            <label key={j} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                onChange={() => setAnswers({ ...answers, [i]: opt })}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submit}>Submit</button>

      {result && (
        <p>
          ✅ You scored {result.score} / {result.total}
        </p>
      )}
    </div>
  );
}
