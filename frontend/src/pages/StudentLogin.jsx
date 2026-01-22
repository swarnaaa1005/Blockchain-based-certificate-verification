import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentLogin() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        {
          registerNumber: regNo,
          password,
        }
      );

      // Save logged-in student data
      localStorage.setItem("student", JSON.stringify(res.data.student));

      setMsg("Login successful. Loading certificates...");

      // Redirect to dashboard
      navigate("/student/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#122B52] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-[#0F2747]/80 backdrop-blur border border-[#F5C84C]/30 shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Student Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Register Number</label>
            <input
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="w-full rounded-xl px-4 py-2 bg-[#0B1F3A] border border-[#F5C84C]/40"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-2 bg-[#0B1F3A] border border-[#F5C84C]/40"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-2 font-medium bg-[#F5C84C] text-[#0B1F3A]"
          >
            Submit
          </button>
        </form>

        {msg && (
          <p className="text-center text-sm mt-4 text-[#F5C84C]">{msg}</p>
        )}
        {/* 🔙 Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 rounded-xl px-4 py-2 text-sm font-medium border border-[#F5C84C]/40 text-[#F5C84C] hover:bg-[#F5C84C] hover:text-[#0B1F3A] transition"
        >
          ← Back to Home
        </button>
      </motion.div>
    </div>
  );
}
