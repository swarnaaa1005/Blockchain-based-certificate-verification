const contract = require("../contract.cjs");

async function main() {
  console.log("Issuing certificate...");

  const tx = await contract.issueCertificate(
    "Alice",
    "REG123",
    "BCA",
    "2025",
    "QmFakePdfHash123"
  );

  await tx.wait();

  console.log("Certificate issued.");

  const cert = await contract.verifyCertificate("REG123");

  console.log("Certificate data:");
  console.log({
    studentName: cert[0],
    registerNumber: cert[1],
    course: cert[2],
    year: cert[3],
    pdfHash: cert[4],
    issuedAt: cert[5].toString()
  });
}

main().catch(console.error);
