import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const { pathname } = useLocation();

  return (
    <div>
      <h1>Admin</h1>
      <div className="flex" style={{ marginBottom: 12 }}>
        <Link to="/admin/subjects"><button className={pathname.includes("/admin/subjects") ? "" : "secondary"}>All Subjects</button></Link>
        <Link to="/admin/create"><button className={pathname.includes("/admin/create") ? "" : "secondary"}>Create</button></Link>
      </div>
      <Outlet />
    </div>
  );
}
