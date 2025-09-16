// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust based on your auth setup

const Navbar = () => {
  const { user, logout } = useAuth(); // adjust based on your auth setup

  return (
    <nav>
      <div className="nav-left">
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
      </div>
      <div className="nav-right">
        <span className="logo-text">Levitate</span>
      </div>
    </nav>
  );
};

export default Navbar;
