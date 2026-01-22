import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IssueCertificateModal from "../components/IssueCertificateModal";

const Admin = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showIssue, setShowIssue] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    registerNumber: "",
    email: "",
    course: "",
    year: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/register",
        form
      );

      alert(res.data.message);

      setForm({
        fullName: "",
        registerNumber: "",
        email: "",
        course: "",
        year: "",
        password: "",
      });

      setShowForm(false);
    } catch (err) {
      console.log(err);
      alert(JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#122B52] text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#F5C84C]/30">
        <h1 className="text-xl font-semibold text-[#F5C84C]">
          Certificate Admin Panel
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-lg bg-[#F5C84C] text-[#0B1F3A] font-medium hover:bg-[#FFD86B] transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-[#F5C84C]">
          Admin Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Card 1 */}
          <div className="bg-[#0F2747]/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-[#F5C84C]/30 hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-[#F5C84C] mb-3">
              1. Register New Student
            </h3>
            <p className="text-sm text-slate-200 mb-4">
              Create a secure login account and store the student's personal
              profile details in the system.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-auto px-4 py-2 rounded-md bg-[#F5C84C] text-[#0B1F3A] font-medium hover:bg-[#FFD86B] transition"
            >
              Open
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0F2747]/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-[#F5C84C]/30">
            <h3 className="text-lg font-semibold text-[#F5C84C] mb-3">
              2. Issue Certificate
            </h3>
            <p className="text-sm text-slate-200 mb-4">
              Upload the PDF, generate its cryptographic hash, and register it
              on the blockchain.
            </p>
            <button
              onClick={() => setShowIssue(true)}
              className="mt-auto px-4 py-2 rounded-md bg-[#F5C84C] text-[#0B1F3A] font-medium hover:bg-[#FFD86B] transition"
            >
              Open
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0F2747]/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-[#F5C84C]/30">
            <h3 className="text-lg font-semibold text-[#F5C84C] mb-3">
              3. Certificates Requests
            </h3>
            <p className="text-sm text-slate-200 mb-4">
              Browse and manage all registered students and issued certificates.
            </p>
            <button className="mt-auto px-4 py-2 rounded-md bg-[#F5C84C] text-[#0B1F3A] font-medium hover:bg-[#FFD86B] transition">
              Open
            </button>
          </div>
        </div>

        {/* Note Section */}
        <div className="mt-12 max-w-4xl w-full bg-[#0F2747]/70 border-l-4 border-[#F5C84C] rounded-lg p-4 text-sm text-slate-200">
          <strong className="text-[#F5C84C]">Important Note:</strong>{" "}
          You must register a new student (Step 1) before issuing a certificate
          (Step 2) for that student.
        </div>

        {/* Footer */}
        <div className="mt-16 text-xs text-slate-300">
          © 2026 Certificate Chain | Admin Access
        </div>

        {/* Register Student Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-[#0F2747] border border-[#F5C84C]/30 rounded-2xl p-8 w-full max-w-md shadow-xl"
            >
              <h3 className="text-xl font-semibold text-[#F5C84C] mb-6">
                Register Student
              </h3>

              {["fullName", "registerNumber", "email", "course", "year", "password"].map(
                (field) => (
                  <input
                    key={field}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    type={field === "password" ? "password" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full mb-3 px-3 py-2 rounded-lg bg-[#0B1F3A] border border-[#F5C84C]/30 text-white focus:outline-none"
                  />
                )
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg border border-[#F5C84C]/40 text-[#F5C84C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F5C84C] text-[#0B1F3A] font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Issue Certificate Modal */}
        {showIssue && <IssueCertificateModal onClose={() => setShowIssue(false)} />}
      </div>
    </div>
  );
};

export default Admin;
