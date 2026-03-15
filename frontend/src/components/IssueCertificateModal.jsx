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

    const doc = new jsPDF("landscape", "mm", "a4");

    // ================= BACKGROUND =================
    doc.setFillColor(248, 249, 250);
    doc.rect(0, 0, 297, 210, "F");

    // ================= BORDER =================
    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(4);
    doc.rect(10, 10, 277, 190);

    doc.setLineWidth(1);
    doc.rect(15, 15, 267, 180);

    // ================= UNIVERSITY LOGO (CREST) =================
    doc.setDrawColor(0, 51, 102);
    doc.setFillColor(0, 51, 102);
    doc.circle(148, 32, 12, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("CU", 148, 34, { align: "center" });

    // ================= UNIVERSITY NAME =================
    doc.setTextColor(0, 51, 102);
    doc.setFontSize(28);
    doc.setFont("times", "bold");
    doc.text("CERTIFICATE CHAIN UNIVERSITY", 148, 50, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("times", "italic");
    doc.text("Office of Academic Records", 148, 58, { align: "center" });

    // ================= GOLD RIBBON =================
    doc.setFillColor(212, 175, 55);
    doc.rect(65, 65, 170, 10, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("OFFICIAL CERTIFICATE", 148, 72, { align: "center" });

    // ================= CERTIFICATE TITLE =================
    doc.setFontSize(34);
    doc.setFont("times", "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 95, { align: "center" });

    // ================= BODY TEXT =================
    doc.setFontSize(16);
    doc.setFont("times", "normal");
    doc.text("This certificate is proudly presented to", 148, 115, {
      align: "center",
    });

    // ================= STUDENT NAME =================
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.text(form.fullName.toUpperCase(), 148, 130, { align: "center" });

    // ================= COURSE TEXT =================
    doc.setFontSize(16);
    doc.setFont("times", "normal");
    doc.text(
      "for successfully completing the academic requirements of the course",
      148,
      145,
      { align: "center" }
    );

    // ================= COURSE NAME =================
    doc.setFontSize(22);
    doc.setFont("times", "bold");
    doc.text(form.course, 148, 158, { align: "center" });

    // ================= REGISTER NUMBER =================
    doc.setFontSize(14);
    doc.setFont("times", "normal");
    doc.text(`Register Number: ${form.registerNumber}`, 90, 172);

    doc.text(`Academic Year: ${form.year}`, 180, 172);

    // ================= GOLD SEAL =================
    doc.setFillColor(212, 175, 55);
    doc.circle(50, 145, 15, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text("OFFICIAL", 50, 143, { align: "center" });
    doc.text("SEAL", 50, 148, { align: "center" });

    // ================= DATE =================
    const date = new Date().toLocaleDateString();
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`Date Issued: ${date}`, 40, 185);

    // ================= SIGNATURES =================
    doc.line(180, 180, 230, 180);
    doc.text("Controller of Examinations", 205, 188, { align: "center" });

    doc.line(235, 180, 285, 180);
    doc.text("Registrar", 260, 188, { align: "center" });

    // ================= FOOTER =================
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "This certificate is digitally secured and verifiable using Blockchain Certificate Registry",
      148,
      200,
      { align: "center" }
    );

    const pdfBlob = doc.output("blob");

    // ================= SEND TO BACKEND =================
    const fd = new FormData();
    fd.append("pdf", pdfBlob, `${form.registerNumber}.pdf`);
    fd.append("meta", JSON.stringify(form));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/certificates/issue",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(`Certificate issued successfully!\nSHA256: ${res.data.pdfHash}`);
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Issue failed");
    }
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
            required
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