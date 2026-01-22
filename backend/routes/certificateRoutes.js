const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const Student = require("../models/Student");

const router = express.Router();

// ================= Multer Setup =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/certificates");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ================= Issue Certificate (new PDF) =================
router.post("/issue", upload.single("pdf"), async (req, res) => {
  try {
    const { meta } = req.body;
    const studentData = JSON.parse(meta);

    const student = await Student.findOne({ registerNumber: studentData.registerNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const pdfPath = req.file.filename;

    // SHA-256 hash of PDF
    const fileBuffer = require("fs").readFileSync(req.file.path);
    const pdfHash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    const newCert = {
      title: `Certificate - ${studentData.course} (${studentData.year})`,
      file: pdfPath,
      pdfHash,
      status: "issued",
      issuedAt: new Date(),
    };

    student.certificates.push(newCert);
    await student.save();

    res.json({ message: "Certificate issued successfully", pdfHash, pdfPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Issue failed", error: err.message });
  }
});

// ================= Student Requests Certificate =================
router.post("/request", async (req, res) => {
  try {
    const { registerNumber, certificateId } = req.body;

    const student = await Student.findOne({ registerNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const cert = student.certificates.id(certificateId);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    if (cert.status !== "generated") {
      return res.status(400).json({ message: "Certificate already requested or issued" });
    }

    cert.status = "requested";
    await student.save();

    res.json({ message: "Certificate request sent to admin" });
  } catch (err) {
    res.status(500).json({ message: "Request failed", error: err.message });
  }
});

// ================= Admin Issues Existing Certificate (no regeneration) =================
router.post("/approve/:regNo/:certId", async (req, res) => {
  try {
    const { regNo, certId } = req.params;

    const student = await Student.findOne({ registerNumber: regNo });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const cert = student.certificates.id(certId);
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    if (cert.status !== "requested") {
      return res.status(400).json({ message: "Certificate not requested" });
    }

    cert.status = "issued";
    cert.issuedAt = new Date();
    await student.save();

    res.json({
      message: "Certificate approved and issued",
      pdfPath: cert.file,
      pdfHash: cert.pdfHash,
    });
  } catch (err) {
    res.status(500).json({ message: "Approval failed", error: err.message });
  }
});

// ================= Admin View All Requested Certificates =================
router.get("/requests", async (req, res) => {
  try {
    const students = await Student.find({ "certificates.status": "requested" });

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

// ================= Fetch Certificates for Student =================
router.get("/student/:regNo", async (req, res) => {
  try {
    const student = await Student.findOne({ registerNumber: req.params.regNo });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ certificates: student.certificates });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

module.exports = router;
