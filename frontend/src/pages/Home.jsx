import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    api.get("/subjects").then((res) => setSubjects(res.data));
  }, []);

  return (
    <>
      <h1>UPSC Learning Portal</h1>
      <p>Explore subjects curated for UPSC preparation.</p>
      <div className="grid">
        {subjects.map((s) => (
          <div className="card" key={s._id}>
            <h3>{s.title}</h3>
            <p>{s.description || "No description"}</p>
            <Link to={`/subjects/${s._id}`}>
              <button>View Topics</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
