import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/subjects").then((res) => {
      setSubjects(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

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
