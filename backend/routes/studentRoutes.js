const express = require("express");
const router = express.Router();

const {
  registerStudent,
  loginStudent,
} = require("../controllers/studentController");

// Register student
router.post("/register", registerStudent);

// Login student
router.post("/login", loginStudent);

module.exports = router;
