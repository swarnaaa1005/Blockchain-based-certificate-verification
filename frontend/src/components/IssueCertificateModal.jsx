import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

const IssueCertificateModal = ({ onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    registerNumber: "",
    course: "",
    year: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateAndSend = async (e) => {
    e.preventDefault();

    // 1. Generate PDF in browser
    const doc = new jsPDF("landscape");
    doc.setFillColor(11, 31, 58);
    doc.rect(0, 0, 297, 210, "F");

    doc.setTextColor(245, 200, 76);
    doc.setFontSize(28);
    doc.text("Certificate of Achievement", 148, 40, { align: "center" });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("This is proudly presented to", 148, 70, { align: "center" });

    doc.setFontSize(24);
    doc.text(form.fullName, 148, 90, { align: "center" });

    doc.setFontSize(14);
    doc.text(
      `Register No: ${form.registerNumber}\nCourse: ${form.course}\nYear: ${form.year}`,
      148,
      120,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.text("Issued by Certificate Chain", 148, 160, { align: "center" });

    const pdfBlob = doc.output("blob");

    // 2. Send to backend
    const fd = new FormData();
    fd.append("pdf", pdfBlob, `${form.registerNumber}.pdf`);
    fd.append("meta", JSON.stringify(form));

    await axios.post("http://localhost:5000/api/certificates/issue", fd);

    alert("Certificate issued successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={generateAndSend}
        className="bg-[#0F2747] border border-[#F5C84C]/30 rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        <h3 className="text-xl font-semibold text-[#F5C84C] mb-6">
          Issue Certificate
        </h3>

        {["fullName", "registerNumber", "course", "year"].map((f) => (
          <input
            key={f}
            name={f}
            placeholder={f.replace(/([A-Z])/g, " $1")}
            value={form[f]}
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 rounded-lg bg-[#0B1F3A] border border-[#F5C84C]/30 text-white"
          />
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#F5C84C]/40 text-[#F5C84C]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#F5C84C] text-[#0B1F3A] font-medium"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueCertificateModal;
