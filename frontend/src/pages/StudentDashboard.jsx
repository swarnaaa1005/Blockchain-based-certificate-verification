import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [cert, setCert] = useState(null);
  const [status, setStatus] = useState("none");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("student");
    if (!data) {
      navigate("/student");
    } else {
      const stu = JSON.parse(data);
      setStudent(stu);

      axios
        .get(
          `http://localhost:5000/api/certificates/student/${stu.registerNumber}`
        )
        .then((res) => {
          setStatus(res.data.status || "none");

          // ✅ Get latest certificate if exists
          if (res.data.certificates && res.data.certificates.length > 0) {
            const latest =
              res.data.certificates[res.data.certificates.length - 1];
            setCert(latest.file);
          }
        })
        .catch(() => {});
    }
  }, [navigate]);

  if (!student) return null;

  const requestCertificate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/certificates/request",
        { registerNumber: student.registerNumber }
      );
      setMsg(res.data.message);
      setStatus("pending");
    } catch (err) {
      setMsg(err.response?.data?.message || "Request failed");
    }
  };

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

        {/* Student Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-8">
          <div>
            <span className="text-slate-300">Name</span>
            <p>{student.fullName}</p>
          </div>
          <div>
            <span className="text-slate-300">Register No</span>
            <p>{student.registerNumber}</p>
          </div>
          <div>
            <span className="text-slate-300">Email</span>
            <p>{student.email}</p>
          </div>
          <div>
            <span className="text-slate-300">Course</span>
            <p>{student.course}</p>
          </div>
        </div>

        {/* Certificate + Logout */}
        <div className="flex flex-col gap-3">
          {status === "none" && (
            <button
              onClick={requestCertificate}
              className="w-fit px-4 py-2 rounded-lg bg-[#F5C84C] text-[#0B1F3A] font-medium"
            >
              Request Certificate
            </button>
          )}

          {status === "pending" && (
            <p className="text-[#F5C84C]">Request pending approval</p>
          )}

          {status === "issued" && cert && (
            <a
              href={`http://localhost:5000/uploads/certificates/${cert}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#F5C84C] underline"
            >
              View Certificate
            </a>
          )}

          {msg && <p className="text-sm text-[#F5C84C]">{msg}</p>}

          <button
            onClick={() => {
              localStorage.removeItem("student");
              navigate("/");
            }}
            className="w-fit px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
