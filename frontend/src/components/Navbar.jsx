import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    location.reload();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      {user?.role === "student" && <Link to="/student">My Page</Link>}
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      {user && (
        <button className="secondary" onClick={logout}>
          Logout ({user.name})
        </button>
      )}
    </nav>
  );
}
