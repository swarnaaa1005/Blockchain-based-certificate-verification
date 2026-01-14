import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portal from "./components/index";
import Admin from "./components/admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Portal */}
        <Route path="/" element={<Portal />} />
        <Route path="/admin" element={<Admin />} />
      

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