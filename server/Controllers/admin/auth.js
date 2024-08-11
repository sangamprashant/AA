const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../Models/users");
const Booking = require("../../Models/bookings");

const register = async (req, res) => {
  const { email, password, role } = req.body;

  // Input validation
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  // Check for existing user
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

const login = async (req, res) => {
  const { email, password, role } = req.body;

  // Input validation
  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Email, password, and role are required",
      success: false,
    });
  }

  console.log(req.body);

  try {
    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or role", success: false });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: "5h" }
    );

    user.password = undefined;

    res
      .status(200)
      .json({ message: "Login successful", token, success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

const checkAuth = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

// will use for all bhut paku kaam hai :(
const BookingId = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    if (!bookingId) {
      return res.status(400).json({
        message: "Booking ID is required",
        success: false,
      });
    }
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Booking retrieved successfully",
      data: booking,
      success: true,
    });
  } catch (error) {
    console.error("Error in BookingId:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  login,
  register,
  checkAuth,
  BookingId,
};
