import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./components/index";
import Admin from "./components/admin";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import Verifier from "./pages/Verifier";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Portal */}
        <Route path="/" element={<Portal />} />

        {/* ✅ Admin Login Page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ✅ Actual Admin Page */}
        <Route path="/admin" element={<Admin />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Verifier */}
        <Route path="/verifier" element={<Verifier />} />
      </Routes>
    </Router>
  );
}

export default App;