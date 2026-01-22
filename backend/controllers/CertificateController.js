const Student = require("../models/Student");

// Student requests certificate
exports.requestCertificate = async (req, res) => {
  const { registerNumber } = req.body;

  const student = await Student.findOne({ registerNumber });
  if (!student)
    return res.status(404).json({ message: "Student not found" });

  student.certificateStatus = "requested";
  await student.save();

  res.json({ message: "Certificate request sent" });
};

// Admin approves certificate
exports.approveCertificate = async (req, res) => {
  const { registerNumber } = req.params;

  const student = await Student.findOne({ registerNumber });
  if (!student || !student.certificate?.pdfPath) {
    return res.status(400).json({
      message: "Certificate not generated yet",
    });
  }

  student.certificateStatus = "issued";
  await student.save();

  res.json({
    message: "Certificate issued successfully",
    pdfPath: student.certificate.pdfPath,
  });
};

// Admin view all requests
exports.getCertificateRequests = async (req, res) => {
  const requests = await Student.find({
    certificateStatus: "requested",
  }).select("-password");

  res.json(requests);
};
