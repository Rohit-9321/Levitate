export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <div className="card">
      <h2>Welcome, {user?.name}</h2>
      <p>Browse subjects from Home and start learning.</p>
    </div>
  );
}
