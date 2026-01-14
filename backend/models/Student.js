const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registerNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  password: { type: String, required: true },

  certificate: {
    type: String, // will store PDF file path or URL
    default: null,
  },

});

module.exports = mongoose.model("Student", studentSchema);