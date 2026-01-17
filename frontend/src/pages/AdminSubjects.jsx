import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/subjects").then((r) => {
      setSubjects(r.data);
      setLoading(false);
    });
  };
  
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this subject? It removes its topics & videos.")) return;
    await api.delete(`/subjects/${id}`);
    load();
  };

  if (loading) return <Loader />;

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
