const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// Register Student
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

// Login Student
exports.loginStudent = async (req, res) => {
  try {
    const { registerNumber, password } = req.body;

    if (!registerNumber || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = await Student.findOne({ registerNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      student: {
        fullName: student.fullName,
        registerNumber: student.registerNumber,
        email: student.email,
        course: student.course,
        year: student.year,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
