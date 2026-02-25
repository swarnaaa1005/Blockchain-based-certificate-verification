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

    console.log("Register Number:", registerNumber);
    console.log("Uploaded File Path:", req.file.path);

    // 1️⃣ Hash uploaded PDF
    const buffer = fs.readFileSync(req.file.path);
    const uploadedHash = crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");

    console.log("Uploaded Hash:", uploadedHash);

    // 2️⃣ Fetch certificate from blockchain
    const cert = await contract.verifyCertificate(registerNumber);

    if (!cert || cert[4] === "") {
      console.log("Certificate not found on blockchain");
      return res.status(404).json({ message: "Certificate not found" });
    }

    console.log("Blockchain Hash:", cert[4]);

    // 3️⃣ Compare hashes
    const isValid = uploadedHash === cert[4];

    console.log("Hash Match:", isValid);

    // Delete temporary uploaded file
    fs.unlinkSync(req.file.path);

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
    console.error("Verification Error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
});

module.exports = router;