import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // 🔐 Hardcoded Admin Credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "12345";

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      credentials.username === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
    ) {
      alert("Login Successful!");
      navigate("/admin", { replace: true }); // redirect to admin page
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#122B52]">
      <form
        onSubmit={handleLogin}
        className="bg-[#0F2747] p-8 rounded-2xl shadow-xl border border-[#F5C84C]/30 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-[#F5C84C] mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-[#0B1F3A] border border-[#F5C84C]/30 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 rounded-lg bg-[#0B1F3A] border border-[#F5C84C]/30 text-white"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[#F5C84C] text-[#0B1F3A] font-semibold hover:bg-[#FFD86B]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;