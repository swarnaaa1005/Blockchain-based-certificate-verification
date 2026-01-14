const express = require("express");
const multer = require("multer");
const Student = require("../models/Student");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/certificates",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

router.post("/issue", upload.single("pdf"), async (req, res) => {
  const meta = JSON.parse(req.body.meta);

  const student = await Student.findOne({
    registerNumber: meta.registerNumber,
  });

  if (!student) return res.status(404).json({ message: "Student not found" });

  student.certificate = req.file.filename;
  await student.save();

  res.json({ message: "Certificate stored" });
});

module.exports = router;
