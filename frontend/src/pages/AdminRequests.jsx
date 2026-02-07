import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/certificates/requests")
      .then((res) => setRequests(res.data));
  }, []);

  const approve = async (regNo, certId) => {
    await axios.post("http://localhost:5000/api/certificates/approve", {
      registerNumber: regNo,
      certificateId: certId,
    });

    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white p-8">
      <h2 className="text-2xl text-[#F5C84C] mb-6">
        Certificate Requests
      </h2>

      {requests.map((r) => (
        <div
          key={r.certificateId}
          className="bg-[#0F2747]/80 border border-[#F5C84C]/30 p-4 rounded mb-4"
        >
          <p>{r.studentName}</p>
          <p>{r.registerNumber}</p>
          <p>{r.title}</p>

          <button
            onClick={() => approve(r.registerNumber, r.certificateId)}
            className="mt-2 px-3 py-1 bg-[#F5C84C] text-[#0B1F3A] rounded"
          >
            Issue Certificate
          </button>
        </div>
      ))}
    </div>
  );
}
