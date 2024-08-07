const express = require("express");
const {
  userCreateBooking,
  viewBookings,
  updateBooking,
  deleteBooking,
} = require("../Controllers/booking");
const { check } = require("express-validator");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// Validation middleware
const validateBooking = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name should contain only alphabets"),
  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name should contain only alphabets"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("country").trim().notEmpty().withMessage("Country is required"),
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number should contain only numbers")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number should be between 10 and 15 digits"),
  check("selectedClass")
    .notEmpty()
    .withMessage("Class selection is required"),
  check("doc")
    .notEmpty()
    .withMessage("Date of class is required")
    .isISO8601()
    .withMessage("Invalid date format"),
];

// Route to create a new booking
router.post("/", validateBooking, userCreateBooking);

// for admin
router.get("/by-status/:status", authenticateToken, viewBookings);
router.put("/update/:id", authenticateToken, updateBooking);
router.delete("/delete/:id", authenticateToken, deleteBooking);

module.exports = router;
