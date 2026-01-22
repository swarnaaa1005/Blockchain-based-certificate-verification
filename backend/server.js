const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ needed for form-data

/* ================= ROUTES ================= */
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));

/* ================= STATIC FILES ================= */
// Allows browser access to generated PDFs
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
