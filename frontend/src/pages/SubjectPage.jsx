import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function SubjectPage() {
  const { id } = useParams();
  const [data, setData] = useState({ subject: null, topics: [] });

  useEffect(() => {
    api.get(`/subjects/${id}`).then((r) => setData(r.data));
  }, [id]);

  return (
    <div>
      <h2>{data.subject?.title}</h2>
      <p>{data.subject?.description}</p>
      <h3>Topics</h3>
      <div className="list">
        {data.topics.map((t) => (
          <div className="card" key={t._id}>
            <div className="flex" style={{ justifyContent: "space-between" }}>
              <div><strong>{t.title}</strong></div>
              <Link to={`/topics/${t._id}`}><button>Open</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
