import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function AdminCreate() {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [videos, setVideos] = useState([]);

  // form states
  const [subTitle, setSubTitle] = useState("");
  const [subDesc, setSubDesc] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [notes, setNotes] = useState(null);

  const loadSubjects = () => api.get("/subjects").then((r) => setSubjects(r.data));
  const loadTopics = (subjectId) => {
    if (!subjectId) return setTopics([]);
    api.get(`/topics/${subjectId}`).then((r) => setTopics(r.data));
  };
  const loadVideos = (topicId) => {
    if (!topicId) return setVideos([]);
    api.get(`/videos/topic/${topicId}`).then((r) => setVideos(r.data));
  };

  useEffect(() => { loadSubjects(); }, []);
  useEffect(() => { loadTopics(selectedSubject); }, [selectedSubject]);
  useEffect(() => { loadVideos(selectedTopic); }, [selectedTopic]);

  const createSubject = async () => {
    if (!subTitle.trim()) return alert("Enter subject title");
    await api.post("/subjects", { title: subTitle, description: subDesc });
    setSubTitle(""); setSubDesc("");
    loadSubjects();
  };

  const createTopic = async () => {
    if (!selectedSubject) return alert("Select subject");
    if (!topicTitle.trim()) return alert("Enter topic title");
    await api.post("/topics", { subjectId: selectedSubject, title: topicTitle });
    setTopicTitle("");
    loadTopics(selectedSubject);
  };

  const createVideo = async () => {
    if (!selectedTopic) return alert("Select topic");
    if (!videoTitle.trim() || !videoUrl.trim()) return alert("Enter video details");
    const fd = new FormData();
    fd.append("topicId", selectedTopic);
    fd.append("title", videoTitle);
    fd.append("url", videoUrl);
    if (notes) fd.append("notes", notes);
    await api.post("/videos", fd, { headers: { "Content-Type": "multipart/form-data" } });
    setVideoTitle(""); setVideoUrl(""); setNotes(null);
    loadVideos(selectedTopic);
    alert("Video created");
  };

  return (
    <div className="grid">
      {/* Subject */}
      <div className="card">
        <h3>Create Subject</h3>
        <input placeholder="Title" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
        <textarea placeholder="Description" value={subDesc} onChange={(e) => setSubDesc(e.target.value)} />
        <button onClick={createSubject}>Create Subject</button>
      </div>

      {/* Topic */}
      <div className="card">
        <h3>Create Topic</h3>
        <div className="label">Subject</div>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((s) => <option key={s._id} value={s._id}>{s.title}</option>)}
        </select>
        <input placeholder="Topic Title" value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)} />
        <button onClick={createTopic}>Create Topic</button>
      </div>

      {/* Video */}
      <div className="card">
        <h3>Create Video</h3>
        <div className="label">Topic</div>
        <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
          <option value="">Select Topic</option>
          {topics.map((t) => <option key={t._id} value={t._id}>{t.title}</option>)}
        </select>
        <input placeholder="Video Title" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
        <input placeholder="YouTube URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <div className="label">Upload Notes (PDF/Doc)</div>
        <input type="file" onChange={(e) => setNotes(e.target.files[0])} />
        <button onClick={createVideo}>Create Video</button>
      </div>

      {/* ✅ List Videos with Add Test button */}
      <div className="card">
        <h3>Videos</h3>
        {videos.length === 0 ? <p>No videos for this topic yet.</p> : (
          <ul>
            {videos.map((v) => (
              <li key={v._id}>
                {v.title} 
                <Link to={`/admin/tests/${v._id}`}>
                  <button style={{ marginLeft: 10 }}>Add Test</button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
