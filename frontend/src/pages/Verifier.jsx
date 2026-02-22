import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verifier() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [pdf, setPdf] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!registerNumber || !pdf) {
      alert("Please enter register number and upload PDF");
      return;
    }

    const formData = new FormData();
    formData.append("registerNumber", registerNumber);
    formData.append("pdf", pdf);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/certificates/verify",
        formData
      );
      setResult(res.data);
    } catch (err) {
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#081c3a] to-[#0b2b55] px-4">
      <div className="w-full max-w-md bg-[#0f2f57] rounded-2xl shadow-2xl p-8 text-white">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Certificate Verification
        </h1>
        <p className="text-sm text-slate-300 text-center mb-6">
          Verify academic certificates securely using blockchain
        </p>

        {/* Register Number */}
        <input
          type="text"
          placeholder="Enter Register Number"
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg text-black focus:outline-none"
        />

        {/* PDF Upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="w-full mb-4 px-4 py-2 bg-white rounded-lg text-black"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-yellow-400 text-[#081c3a] font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          {loading ? "Verifying..." : "Verify Certificate"}
        </button>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 p-4 rounded-lg border ${
              result.valid
                ? "border-emerald-400 bg-emerald-400/10"
                : "border-red-400 bg-red-400/10"
            }`}
          >
            <h3 className="font-semibold mb-2">
              {result.valid
                ? "✅ Certificate is VALID"
                : "❌ Certificate is INVALID"}
            </h3>

            {result.valid && (
              <div className="text-sm space-y-1">
                <p><span className="font-semibold">Name:</span> {result.studentName}</p>
                <p><span className="font-semibold">Course:</span> {result.course}</p>
                <p><span className="font-semibold">Year:</span> {result.year}</p>
              </div>
            )}
          </div>
        )}

        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-6 border border-yellow-400 text-yellow-400 py-2 rounded-lg hover:bg-yellow-400 hover:text-[#081c3a] transition"
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

export default Verifier;