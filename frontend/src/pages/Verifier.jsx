import { useState } from "react";
import axios from "axios";

function Verifier() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [pdf, setPdf] = useState(null);
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    const formData = new FormData();
    formData.append("registerNumber", registerNumber);
    formData.append("pdf", pdf);

    const res = await axios.post(
      "http://localhost:5000/api/certificates/verify",
      formData
    );

    setResult(res.data);
  };

  return (
    <div>
      <h2>Verify Certificate</h2>

      <input
        type="text"
        placeholder="Register Number"
        onChange={(e) => setRegisterNumber(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setPdf(e.target.files[0])}
      />

      <button onClick={handleVerify}>Verify</button>

      {result && (
        <div>
          <h3>
            Status: {result.valid ? "✅ VALID CERTIFICATE" : "❌ INVALID CERTIFICATE"}
          </h3>
          <p>Name: {result.studentName}</p>
          <p>Course: {result.course}</p>
          <p>Year: {result.year}</p>
        </div>
      )}
    </div>
  );
}

export default Verifier;