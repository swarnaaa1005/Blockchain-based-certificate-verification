const Student = require("../models/Student");
const {
  storeCertificateOnChain,
} = require("../blockchain/certificateChain");

/* =====================================================
   STUDENT REQUESTS CERTIFICATE
   ===================================================== */
exports.requestCertificate = async (req, res) => {
  const { registerNumber } = req.body;

  const student = await Student.findOne({ registerNumber });
  if (!student)
    return res.status(404).json({ message: "Student not found" });

  student.certificateStatus = "requested";
  await student.save();

  res.json({ message: "Certificate request sent" });
};

/* =====================================================
   ADMIN APPROVES & ISSUES CERTIFICATE (BLOCKCHAIN ADDED)
   ===================================================== */
exports.approveCertificate = async (req, res) => {
  const { registerNumber } = req.params;

  const student = await Student.findOne({ registerNumber });
  if (!student || !student.certificate?.pdfPath) {
    return res.status(400).json({
      message: "Certificate not generated yet",
    });
  }

  // 🔐 HASH ALREADY GENERATED FROM PDF
  const pdfHash = student.certificate.hash;

  // 🔗 STORE HASH ON BLOCKCHAIN
  const txHash = await storeCertificateOnChain({
    studentName: student.fullName,
    registerNumber: student.registerNumber,
    course: student.course,
    year: student.year,
    pdfHash,
  });

  // Update DB
  student.certificateStatus = "issued";
  student.blockchainTx = txHash;
  await student.save();

  res.json({
    message: "Certificate issued & stored on blockchain",
    blockchainTx: txHash,
  });
};

/* =====================================================
   ADMIN VIEW ALL CERTIFICATE REQUESTS
   ===================================================== */
exports.getCertificateRequests = async (req, res) => {
  const requests = await Student.find({
    certificateStatus: "requested",
  }).select("-password");

  res.json(requests);
};
