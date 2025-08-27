import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ytEmbed = (url) => {
  try {
    const u = new URL(url);
    const v = u.hostname.includes("youtu.be")
      ? u.pathname.replace("/", "")
      : u.searchParams.get("v");
    return `https://www.youtube.com/embed/${v}`;
  } catch {
    return url;
  }
};

export default function TopicPage() {
  const { id } = useParams();
  const navigate = useNavigate();  // ✅ Moved here

  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState(null);

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get(`/videos/topic/${id}`).then((r) => {
      setVideos(r.data);
      setActive(r.data[0] || null);
    });
  }, [id]);

  useEffect(() => {
    if (!active?._id) return;
    api.get(`/messages/${active._id}`).then((r) => setMessages(r.data));
  }, [active?._id]);

  const sendMessage = async () => {
    if (!token) return alert("Please login to comment");
    if (!msg.trim()) return;
    const res = await api.post("/messages", { videoId: active._id, text: msg });
    setMessages([res.data, ...messages]);
    setMsg("");
  };

  return (
    <div className="grid">
      <div className="card">
        <h3>Videos</h3>
        <div className="list">
          {videos.map((v) => (
            <button
              key={v._id}
              className="secondary"
              onClick={() => setActive(v)}
              style={{ textAlign: "left" }}
            >
              {v.title}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ gridColumn: "span 2" }}>
        {active ? (
          <>
            <h2>{active.title}</h2>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={ytEmbed(active.url)}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>

            <div className="flex" style={{ marginTop: 12 }}>
              {active.notesFile ? (
                <a
                  href={`http://localhost:5000${active.notesFile}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>Download Notes</button>
                </a>
              ) : (
                <span>No notes uploaded</span>
              )}
            </div>

            <div>
              <div className="card" style={{ marginTop: 20 }}>
                <h3>Test for this Lecture</h3>
                <button onClick={() => navigate(`/test/${active._id}`)}>
                  Attempt Test
                </button>
              </div>
            </div>

            <hr />
            <h3>Messages</h3>
            <div className="flex">
              <input
                placeholder="Ask a question..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>

            <div className="list" style={{ marginTop: 10 }}>
              {messages.map((m) => (
                <div className="card" key={m._id}>
                  <strong>{m.user?.name || "User"}:</strong> {m.text}
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {new Date(m.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Select a video on the left.</p>
        )}
      </div>
    </div>
  );
}
