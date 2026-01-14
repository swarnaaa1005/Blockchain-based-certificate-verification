const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registerNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);