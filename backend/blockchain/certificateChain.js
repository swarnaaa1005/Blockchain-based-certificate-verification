// backend/blockchain/certificateChain.js

const contract = require("./contract"); 
// ⬆️ This imports the deployed smart contract instance

/* =====================================================
   STORE CERTIFICATE HASH ON BLOCKCHAIN
   ===================================================== */
async function storeCertificateOnChain({
  studentName,
  registerNumber,
  course,
  year,
  pdfHash,
}) {
  const tx = await contract.issueCertificate(
    studentName,
    registerNumber,
    course,
    year,
    pdfHash
  );

  await tx.wait(); // wait for mining
  return tx.hash;
}

/* =====================================================
   VERIFY CERTIFICATE FROM BLOCKCHAIN
   ===================================================== */
async function verifyCertificateOnChain(registerNumber) {
  return await contract.verifyCertificate(registerNumber);
}

module.exports = {
  storeCertificateOnChain,
  verifyCertificateOnChain,
};
