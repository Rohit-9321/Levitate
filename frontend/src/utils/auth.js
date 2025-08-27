export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.role === "admin";
}
