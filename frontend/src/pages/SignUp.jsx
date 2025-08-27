import { useState } from "react";
import api from "../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful. Please login.");
      location.href = "/login";
    } catch (e) {
      alert(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
        <input type="password" placeholder="Password" value={form.password}
               onChange={(e) => setForm({ ...form, password: e.target.value })}/>
        <div className="label">Role</div>
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
