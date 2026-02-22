const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const multer = require("multer");
const contract = require("../blockchain/contract.cjs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/verify", upload.single("pdf"), async (req, res) => {
  try {
    const { registerNumber } = req.body;

    if (!registerNumber || !req.file) {
      return res.status(400).json({ message: "Missing data" });
    }

    // 1️⃣ Hash uploaded PDF
    const buffer = fs.readFileSync(req.file.path);
    const uploadedHash = crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");

    // 2️⃣ Fetch from blockchain
    const cert = await contract.verifyCertificate(registerNumber);

    if (!cert || cert[4] === "") {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // 3️⃣ Compare hashes
    const isValid = uploadedHash === cert[4];

    res.json({
      valid: isValid,
      studentName: cert[0],
      registerNumber: cert[1],
      course: cert[2],
      year: cert[3],
      blockchainHash: cert[4],
      uploadedHash
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;