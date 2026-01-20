import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./components/index";
import Admin from "./components/admin";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Portal */}
        <Route path="/" element={<Portal />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      

        {/* Later you can add these pages */}
        {/* 
        
        <Route path="/verifier" element={<Verifier />} />
        <Route path="/student" element={<Student />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;