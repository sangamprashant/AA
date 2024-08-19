const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../Models/users");
const Booking = require("../../Models/bookings");
const Contact = require("../../Models/contact");

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

  try {
    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or role", success: false });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    // Get current date and time
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.getHours() * 60 + now.getMinutes(); 
    const startTime = 9 * 60 + 45; 
    const endTime = 10 * 60; 

    // Determine attendance status
    let status = "early";
    let details = `Arrived at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (currentTime >= startTime && currentTime <= endTime) {
      status = "present";
      details = "On time";
    } else if (currentTime > endTime) {
      status = "late";
      details = `Arrived at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    // Find or create the attendance record for today
    const existingRecord = user.attendanceRecords.find(record => record.date.toISOString().split('T')[0] === currentDate);

    if (!existingRecord) {
      user.attendanceRecords.push({
        date: now,
        status,
        details,
      });

      await user.save();
    }

    // Create JWT token with attendance time
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        attendanceTime: now.toISOString(),
      },
      config.JWT_SECRET,
    );

    user.password = undefined;
    user.notifications = undefined;
    user.attendanceRecords = undefined;

    res.status(200).json({ message: "Login successful", token, success: true, user });
  } catch (error) {
    console.error("Login error:", error);
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
    const booking = await Booking.findById(bookingId).populate(
      "assignedEmployee",
      "name email"
    );
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

const BookingType = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  const query = {};
  query.state = req.body.type;
  query.approvedBYHigher = true;

  if (user.role === "employee") {
    query.assignedEmployee = user._id;
  } else if (user.role === "manager") {
    const managedEmployees = await User.find({ manager: user._id }, "_id");
    if (managedEmployees.length > 0) {
      const employeeIds = managedEmployees.map((emp) => emp._id);
      query.assignedEmployee = { $in: employeeIds };
    } else {
      return res.status(200).json([]);
    }
  }

  try {
    const bookings = await Booking.find(query).populate(
      "assignedEmployee",
      "name email"
    );
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const ContactsByType = async (req, res) => {
  try {
    const { type, page = 1, pageSize = 10 } = req.query;
    let contacts;
    if (type === "received") {
      contacts = await Contact.find({ checked: false })
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));
    } else if (type === "responded") {
      contacts = await Contact.find({ checked: true })
        .skip((page - 1) * pageSize)
        .limit(parseInt(pageSize));
    } else {
      return res
        .status(400)
        .json({ message: "Invalid type specified", success: false });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      message: "Server error, please try again later.",
      error,
      success: false,
    });
  }
};

module.exports = {
  login,
  register,
  checkAuth,
  BookingId,
  BookingType,
  ContactsByType,
};
