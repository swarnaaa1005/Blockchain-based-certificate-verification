import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("student");
    if (!data) {
      navigate("/student"); // if not logged in
    } else {
      setStudent(JSON.parse(data));
    }
  }, [navigate]);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#122B52] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-[#0F2747]/80 border border-[#F5C84C]/30 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-[#F5C84C] mb-6">
          Student Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-300">Full Name</span>
            <p className="text-white">{student.fullName}</p>
          </div>

          <div>
            <span className="text-slate-300">Register Number</span>
            <p className="text-white">{student.registerNumber}</p>
          </div>

          <div>
            <span className="text-slate-300">Email</span>
            <p className="text-white">{student.email}</p>
          </div>

          <div>
            <span className="text-slate-300">Course</span>
            <p className="text-white">{student.course}</p>
          </div>

          <div>
            <span className="text-slate-300">Year</span>
            <p className="text-white">{student.year}</p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-[#0B1F3A] border border-[#F5C84C]/20 text-sm text-slate-300">
          Certificates issued to you will appear here in the next phase.
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("student");
            navigate("/");
          }}
          className="mt-6 px-4 py-2 rounded-lg bg-[#F5C84C] text-[#0B1F3A] font-medium"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
