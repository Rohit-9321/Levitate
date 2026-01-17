import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <div className="card">
      <h2>Welcome, {user?.name}</h2>
      <p>Browse subjects from Home and start learning.</p>
      
      <div style={{ marginTop: "20px", padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
        <h3 style={{ marginBottom: "15px" }}>My Profile Information</h3>
        <div style={{ display: "grid", gap: "10px" }}>
          <div><strong>Name:</strong> {user?.name || "Not provided"}</div>
          <div><strong>Email:</strong> {user?.email || "Not provided"}</div>
          <div><strong>Phone:</strong> {user?.phone || "Not provided"}</div>
          <div><strong>Address:</strong> {user?.address || "Not provided"}</div>
          <div><strong>School:</strong> {user?.schoolName || "Not provided"}</div>
        </div>
      </div>
      
      <Link to="/profile"><button style={{ marginTop: "15px" }}>Edit Profile</button></Link>
    </div>
  );
}
