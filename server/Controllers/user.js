const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const config = require("../config");
const User = require("../Models/users");

// Registration validation middleware
const validateRegister = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Login validation middleware
const validateLogin = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("password").trim().notEmpty().withMessage("Password is required"),
];

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", success: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  validateRegister,
  validateLogin,
  register,
  login,
  logout,
};
