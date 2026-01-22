import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("student");
    if (!data) {
      navigate("/student");
    } else {
      const stu = JSON.parse(data);
      setStudent(stu);

      axios
        .get(`http://localhost:5000/api/certificates/student/${stu.registerNumber}`)
        .then((res) => {
          setCertificates(res.data.certificates || []);
        })
        .catch(() => {});
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

        <div className="flex flex-col gap-3">
          {certificates.map((cert) => (
            <div key={cert._id} className="mb-3">
              <p className="font-medium">{cert.title}</p>
              <p>Status: {cert.status}</p>
              {cert.status === "issued" && (
                <>
                  <a
                    href={`http://localhost:5000/uploads/certificates/${cert.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F5C84C] underline"
                  >
                    View Certificate
                  </a>
                  <p className="text-xs text-slate-300 break-all">
                    SHA-256: {cert.pdfHash}
                  </p>
                </>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              localStorage.removeItem("student");
              navigate("/student");
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
