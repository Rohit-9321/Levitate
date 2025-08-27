import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCreate from "./pages/AdminCreate.jsx";
import AdminSubjects from "./pages/AdminSubjects.jsx";
import SubjectPage from "./pages/SubjectPage.jsx";
import TopicPage from "./pages/TopicPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import TestPage from "./pages/TestPage.jsx";
import AdminAddTest from "./pages/AdminAddTest.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/subjects" replace />} />
            <Route path="create" element={<AdminCreate />} />
            <Route path="subjects" element={<AdminSubjects />} />
            {/* ✅ NEW: Add Test for a Video */}
            <Route path="tests/:videoId" element={<AdminAddTest />} />
          </Route>

          <Route path="/subjects/:id" element={<SubjectPage />} />
          <Route path="/topics/:id" element={<TopicPage />} />

          {/* ✅ Student attempting test */}
          <Route path="/test/:videoId" element={<TestPage />} />


          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}
