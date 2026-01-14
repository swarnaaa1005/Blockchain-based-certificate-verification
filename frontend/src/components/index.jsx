import { motion } from "framer-motion";
import { ShieldCheck, Search, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Admin Panel",
      desc: "Issue certificates, upload records, and manage student accounts securely.",
      btn: "Enter Admin →",
      icon: <ShieldCheck className="w-8 h-8" />,
      action: () => navigate("/admin"),
    },
    {
      title: "Verifier",
      desc: "Verify the authenticity of a certificate using its cryptographic hash or QR code.",
      btn: "Enter Verifier →",
      icon: <Search className="w-8 h-8" />,
      action: () => navigate("/verifier"),
    },
    {
      title: "Student Portal",
      desc: "Log in to view, download, and share your officially issued certificates.",
      btn: "Enter Student →",
      icon: <GraduationCap className="w-8 h-8" />,
      action: () => navigate("/student"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] to-[#122B52] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-semibold text-center mb-12"
        >
          Certificate Verification Portal
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-[#0F2747]/80 backdrop-blur border border-[#F5C84C]/30 shadow-lg p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 text-[#F5C84C] mb-4">
                {c.icon}
                <h2 className="text-xl font-medium text-white">{c.title}</h2>
              </div>

              <p className="text-sm text-slate-200 flex-1 leading-relaxed">
                {c.desc}
              </p>

              <button
                onClick={c.action}
                className="mt-6 w-fit rounded-xl px-4 py-2 text-sm font-medium bg-[#F5C84C] text-[#0B1F3A] hover:bg-[#FFD86B] transition"
              >
                {c.btn}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 mt-12">
          © 2026 Certificate Chain | A Secure Academic Credential Platform
        </p>
      </div>
    </div>
  );
}