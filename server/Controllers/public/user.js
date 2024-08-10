const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const config = require("../../config");
const User = require("../../Models/users");

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

// Validation middleware for changing email and password
const validateChangeEmail = [
  check("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),
  check("oldEmail")
    .trim()
    .notEmpty()
    .withMessage("Old email is required")
    .isEmail()
    .withMessage("Invalid old email address"),
  check("newEmail")
    .trim()
    .notEmpty()
    .withMessage("New email is required")
    .isEmail()
    .withMessage("Invalid new email address"),
];

const validateChangePassword = [
  check("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password is required"),
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
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
    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Change Email Controller
const changeEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const { currentPassword, oldEmail, newEmail } = req.body;

  try {
    const user = await User.findOne({ email: oldEmail });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await user.isValidPassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect", success: false });
    }

    user.email = newEmail;
    user.password = currentPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Email updated successfully", success: true });
  } catch (error) {
    console.error("Error changing email:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Change Password Controller
const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await user.isValidPassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect", success: false });
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  register,
  login,
  validateChangeEmail,
  validateChangePassword,
  changeEmail,
  changePassword,
};
