const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: String,
  registerNumber: String,
  issueDate: Date,
  fileName: String,
  certificateHash: String,
});

module.exports = mongoose.model("Certificate", certificateSchema);
