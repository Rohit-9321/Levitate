import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);

  const load = () => api.get("/subjects").then((r) => setSubjects(r.data));
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this subject? It removes its topics & videos.")) return;
    await api.delete(`/subjects/${id}`);
    load();
  };

  return (
    <>
      <h2>All Subjects</h2>
      <div className="grid">
        {subjects.map((s) => (
          <div className="card" key={s._id}>
            <h3>{s.title}</h3>
            <p>{s.description || "No description"}</p>
            <div className="flex">
              <Link to={`/subjects/${s._id}`}><button>Open</button></Link>
              <button className="danger" onClick={() => remove(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
