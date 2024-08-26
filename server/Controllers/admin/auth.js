const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../Models/users");
const Booking = require("../../Models/bookings");
const Contact = require("../../Models/contact");
const moment = require("moment-timezone");

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

    // Get current date and time in IST
    const now = moment().tz("Asia/Kolkata");
    const currentDate = now.format("YYYY-MM-DD");
    const currentTime = now.hours() * 60 + now.minutes(); // Time in minutes
    const startTime = 9 * 60 + 45; // 9:45 AM in minutes
    const endTime = 10 * 60; // 10:00 AM in minutes

    // Determine attendance status
    let status = "early";
    let details = `Arrived at ${now.format("hh:mm A")}`;

    if (currentTime >= startTime && currentTime <= endTime) {
      status = "present";
      details = "On time";
    } else if (currentTime > endTime) {
      status = "late";
      details = `Arrived at ${now.format("hh:mm A")}`;
    }

    // Check if attendance is already marked for today
    let attendanceRecord = user.attendanceRecords.find(
      (record) =>
        moment(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD") ===
        currentDate
    );

    // If no attendance record for today, create one
    if (!attendanceRecord) {
      attendanceRecord = {
        date: now.toDate(), // Store date as a JS Date object
        status,
        details,
        activeTime: { loginTime: now.toDate(), minutes: 0 }, // Ensure activeTime is initialized
      };
      user.attendanceRecords.push(attendanceRecord);
    } else {
      // If record exists, ensure activeTime is initialized
      if (!attendanceRecord.activeTime) {
        attendanceRecord.activeTime = { loginTime: now.toDate(), minutes: 0 };
      } else {
        attendanceRecord.activeTime.loginTime = now.toDate();
      }
    }

    // Debugging: log user attendanceRecords before saving
    console.log(
      "User attendanceRecords before saving:",
      user.attendanceRecords
    );

    // Validate and save the user
    await user.validate();
    await user.save();

    // Create JWT token with attendance time
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        loginTime: now.toISOString(),
      },
      config.JWT_SECRET
    );

    // Remove sensitive and unnecessary information before sending the response
    user.password = undefined;
    user.notifications = undefined;
    user.attendanceRecords = undefined;

    res
      .status(200)
      .json({ message: "Login successful", token, success: true, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

const logout = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const now = moment().tz("Asia/Kolkata");

    // Find the most recent attendance record (either today or yesterday)
    const attendanceRecord = user.attendanceRecords
      .sort((a, b) => moment(b.date).diff(moment(a.date)))
      .find((record) =>
        moment(record.date).tz("Asia/Kolkata").isSameOrBefore(now)
      );

    // Safeguard: Check if a valid attendance record exists
    if (!attendanceRecord) {
      return res.status(400).json({
        message:
          "No valid login record found. Cannot log out without logging in.",
        success: false,
      });
    }

    // Safeguard: Check if activeTime and loginTime are recorded
    const activeTime = attendanceRecord.activeTime || {};
    const loginTime = activeTime.loginTime
      ? moment(activeTime.loginTime).tz("Asia/Kolkata")
      : null;

    if (!loginTime || !loginTime.isValid()) {
      return res.status(400).json({
        message: "Login time not found. Please ensure you have logged in.",
        success: false,
      });
    }

    // Calculate the duration in minutes
    const logoutTime = now;
    const midnight = loginTime.clone().endOf("day");

    let firstDayDuration = 0;
    let secondDayDuration = 0;

    if (logoutTime.isSameOrBefore(midnight)) {
      // If the session ends before midnight, calculate the duration for the same day
      firstDayDuration = logoutTime.diff(loginTime, "minutes");
    } else {
      // If the session spans across two days, calculate the split
      firstDayDuration = midnight.diff(loginTime, "minutes"); // Time until midnight
      secondDayDuration = logoutTime.diff(midnight, "minutes"); // Time after midnight
    }

    // Update the first day's attendance record
    attendanceRecord.activeTime.minutes =
      (attendanceRecord.activeTime.minutes || 0) + firstDayDuration;

    // Save the updated user document
    await user.save();

    // If session spans across two days, update the second day's attendance record
    if (secondDayDuration > 0) {
      const nextDay = loginTime.clone().add(1, "day").startOf("day");

      let nextDayAttendance = user.attendanceRecords.find(
        (record) =>
          moment(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD") ===
          nextDay.format("YYYY-MM-DD")
      );

      if (!nextDayAttendance) {
        // Create an attendance record for the next day if it doesn't exist
        nextDayAttendance = {
          date: nextDay.toDate(),
          status: "present", // Adjust this based on your logic
          details: "Continued session from previous day",
          activeTime: { minutes: secondDayDuration, loginTime: null },
        };
        user.attendanceRecords.push(nextDayAttendance);
      } else {
        nextDayAttendance.activeTime.minutes =
          (nextDayAttendance.activeTime.minutes || 0) + secondDayDuration;
      }

      // Save the updated user document
      await user.save();
    }

    res.status(200).json({
      message: "Logout successful, active time recorded",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
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
  logout,
};
