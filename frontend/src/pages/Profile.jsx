import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    schoolName: user.schoolName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validate password match if changing password
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    try {
      const res = await api.put("/auth/profile", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        schoolName: form.schoolName,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined
      });

      // Update localStorage with new user data
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setMessage("Profile updated successfully!");
      setForm({ ...form, currentPassword: "", newPassword: "", confirmPassword: "" });
      
      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin" : "/student");
      }, 1500);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Profile</h2>
      
      {message && <div style={{ padding: "10px", background: "#d4edda", color: "#155724", borderRadius: "4px", marginBottom: "15px" }}>{message}</div>}
      {error && <div style={{ padding: "10px", background: "#f8d7da", color: "#721c24", borderRadius: "4px", marginBottom: "15px" }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Phone Number</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Address</label>
          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows="3"
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>School Name</label>
          <input
            type="text"
            placeholder="School Name"
            value={form.schoolName}
            onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
          />
        </div>

        <hr style={{ margin: "20px 0" }} />
        <h3 style={{ marginBottom: "15px" }}>Change Password (Optional)</h3>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
        </div>

        <div className="flex" style={{ gap: "10px" }}>
          <button type="submit">Update Profile</button>
          <button type="button" className="secondary" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
