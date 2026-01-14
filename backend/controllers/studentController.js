const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

exports.registerStudent = async (req, res) => {
  try {
    const { fullName, registerNumber, email, course, year, password } = req.body;

    if (!fullName || !registerNumber || !email || !course || !year || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Student.findOne({ registerNumber });
    if (exists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      registerNumber,
      email,
      course,
      year,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Student registered", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};