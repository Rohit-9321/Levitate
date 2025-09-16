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
    <img src={logo} alt="Levitate" />
  </div>
</nav>
