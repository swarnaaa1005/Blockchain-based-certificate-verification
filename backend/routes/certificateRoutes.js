const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

/* =====================================================
   STUDENT REQUESTS CERTIFICATE (no upload here)
   ===================================================== */
router.post("/request", async (req, res) => {
  try {
    const { registerNumber, certificateId } = req.body;

    const student = await Student.findOne({ registerNumber });
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    const cert = student.certificates.id(certificateId);
    if (!cert)
      return res.status(404).json({ message: "Certificate not found" });

    if (cert.status !== "generated") {
      return res
        .status(400)
        .json({ message: "Certificate already requested or issued" });
    }

    cert.status = "requested";
    await student.save();

    res.json({ message: "Certificate request sent to admin" });
  } catch (err) {
    res.status(500).json({ message: "Request failed", error: err.message });
  }
});

/* =====================================================
   ADMIN ISSUES EXISTING CERTIFICATE (NO REGENERATION)
   ===================================================== */
router.post("/issue", async (req, res) => {
  try {
    const { registerNumber, certificateId } = req.body;

    const student = await Student.findOne({ registerNumber });
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    const cert = student.certificates.id(certificateId);
    if (!cert)
      return res.status(404).json({ message: "Certificate not found" });

    if (cert.status !== "requested") {
      return res
        .status(400)
        .json({ message: "Certificate not requested" });
    }

    cert.status = "issued";
    cert.issuedAt = new Date();

    await student.save();

    res.json({ message: "Certificate issued successfully" });
  } catch (err) {
    res.status(500).json({ message: "Issue failed", error: err.message });
  }
});

/* =====================================================
   ADMIN VIEW ALL REQUESTED CERTIFICATES
   ===================================================== */
router.get("/requests", async (req, res) => {
  try {
    const students = await Student.find({
      "certificates.status": "requested",
    });

    const requests = [];

    students.forEach((student) => {
      student.certificates.forEach((cert) => {
        if (cert.status === "requested") {
          requests.push({
            studentName: student.fullName,
            registerNumber: student.registerNumber,
            certificateId: cert._id,
            title: cert.title,
            file: cert.file,
          });
        }
      });
    });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

/* =====================================================
   STUDENT FETCH CERTIFICATES & STATUS
   ===================================================== */
router.get("/student/:regNo", async (req, res) => {
  try {
    const student = await Student.findOne({
      registerNumber: req.params.regNo,
    });

    if (!student)
      return res.status(404).json({ message: "Student not found" });

    res.json({ certificates: student.certificates });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

module.exports = router;
