const mongoose = require("mongoose");

/* =======================
   Certificate Sub Schema
   ======================= */
const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },

  file: { type: String, required: true }, // PDF filename / path

  pdfHash: { type: String, required: true }, // blockchain hash

  issuedAt: { type: Date },

  status: {
    type: String,
    enum: ["generated", "requested", "issued"],
    default: "generated",
  },
});

/* =======================
   Student Schema
   ======================= */
const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    registerNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    password: { type: String, required: true },

    // Multiple certificates per student
    certificates: {
      type: [certificateSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
