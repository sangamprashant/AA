const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../../Models/users");
const Booking = require("../../Models/bookings");
const Contact = require("../../Models/contact");
const moment = require("moment-timezone");
const moment_time = require("moment");
const sendContactResponse = require("../../Mail/sendContactResponse");

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

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isValidPassword = await user.comparePassword(oldPassword);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ message: "Invalid old password", success: false });
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

const checkAuth = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const user = await User.findById(req.user.id).select(
      "name email role createdAt"
    );
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

const BookingUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { state, comment, documents, receipts } = req.body;

    console.log({
      id,
      state,
      comment,
      documents,
      receipts,
    });

    const booking = await Booking.findOne({
      _id: id,
      assignedEmployee: req.user.id,
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

    // Check if the new state or comment is different from the last stateHistory entry
    const lastStateHistory =
      booking.stateHistory[booking.stateHistory.length - 1];
    const isStateDifferent = lastStateHistory
      ? lastStateHistory.state !== state
      : true;
    const isCommentDifferent = lastStateHistory
      ? lastStateHistory.comment !== comment
      : true;

    // Only push a new stateHistory entry if state or comment has changed
    if (isStateDifferent || isCommentDifferent) {
      const stateHistoryEntry = {
        state,
        comment,
        updatedBy: req.user.id,
      };
      booking.state = state;
      booking.stateHistory.push(stateHistoryEntry);
    }

    // Ensure booking.files exists
    if (!booking.files) {
      booking.files = {};
    }

    // Append new documents/receipts to existing ones instead of overwriting
    if (documents) {
      booking.files.documents = [
        ...(booking.files.documents || []),
        ...documents,
      ];
    }
    if (receipts) {
      booking.files.receipts = [...(booking.files.receipts || []), ...receipts];
    }

    await booking.save();
    res.json({ message: "Booking updated successfully", booking });
  } catch (err) {
    console.error("Error in BookingUpdate:", err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const BookingSearch = async (req, res) => {
  const { mobileNumber, email } = req.query;

  try {
    let criteria = {};

    if (req.user.role === "employee") {
      criteria.assignedEmployee = req.user.id;
    }
    if (mobileNumber) {
      criteria.phoneNumber = { $regex: mobileNumber, $options: "i" };
    }
    if (email) {
      criteria.email = { $regex: email, $options: "i" };
    }

    const bookings = await Booking.find(criteria).select(
      "firstName lastName email phoneNumber"
    );

    console.log("Bookings Found:", bookings);

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server error", error });
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

  // Date filter logic
  const dateFilter = req.body.dateFilter;
  const customDateRange = req.body.customDateRange;
  const createdOrUpdated = req.body.createdOrUpdated || "createdAt";
  const dateField = createdOrUpdated === "updatedAt" ? "updatedAt" : "createdAt";

  if (dateFilter === "today") {
    query[dateField] = {
      $gte: moment_time().startOf("day").toDate(),
      $lte: moment_time().endOf("day").toDate(),
    };
  } else if (dateFilter === "yesterday") {
    query[dateField] = {
      $gte: moment_time().subtract(1, "days").startOf("day").toDate(),
      $lte: moment_time().subtract(1, "days").endOf("day").toDate(),
    };
  } else if (dateFilter === "in-7-days") {
    query[dateField] = {
      $gte: moment_time().subtract(7, "days").startOf("day").toDate(),
      $lte: moment_time().endOf("day").toDate(),
    };
  } else if (dateFilter === "in-a-month") {
    query[dateField] = {
      $gte: moment_time().subtract(1, "months").startOf("day").toDate(),
      $lte: moment_time().endOf("day").toDate(),
    };
  } else if (dateFilter === "in-a-year") {
    query[dateField] = {
      $gte: moment_time().subtract(1, "years").startOf("day").toDate(),
      $lte: moment_time().endOf("day").toDate(),
    };
  } else if (dateFilter === "custom-date-range" && customDateRange) {
    const [startDate, endDate] = customDateRange;
    query[dateField] = {
      $gte: moment_time(startDate).startOf("day").toDate(),
      $lte: moment_time(endDate).endOf("day").toDate(),
    };
  }

  const page = parseInt(req.body.page, 10) || 1;
  const limit = parseInt(req.body.limit, 10) || 10;
  const sortType = req.body.sort || "ascending";
  const skip = (page - 1) * limit;

  let sortOptions = {};
  if (sortType === "ascending") {
    sortOptions = { createdAt: 1 };
  } else if (sortType === "descending") {
    sortOptions = { createdAt: -1 };
  } else if (sortType === "most-recent") {
    sortOptions = { updatedAt: -1 };
  }

  try {
    const bookings = await Booking.find(query)
      .populate("assignedEmployee", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      bookings,
      total,
      page,
      limit,
    });
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

const replyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { responseMessage } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { responseMessage: responseMessage, checked: true },
      { new: true }
    );
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    await Promise.all([contact.save(), sendContactResponse(contact)]);
    res.status(200).json({
      message: "Contact replied successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error updating contact:", error);
    res.status(500).json({
      message: "Server error, please try again later.",
      error,
      success: false,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    res.status(200).json({
      message: "Contact deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error deleting contact:", error);
    res.status(500).json({
      message: "Server error, please try again later.",
      error,
      success: false,
    });
  }
};

const userProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("name email role createdAt");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const bookingReminder = async (req, res) => {
  const { id } = req.params;
  const { reminder } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

    if (reminder === null || reminder === undefined || reminder.trim() === "") {
      booking.reminder = undefined;
    } else {
      booking.reminder = reminder;
    }

    await booking.save();
    res
      .status(200)
      .json({ message: "Reminder updated successfully", success: true });
  } catch (err) {
    console.error("Error updating booking reminder:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const bookingCount = async (req, res) => {
  try {
    const { month, year } = req.query;
    const { id } = req.user;

    const user = await User.findById(id);

    if (!month || !year) {
      return res
        .status(400)
        .json({ success: false, error: "Month and year are required" });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    const monthNum = parseInt(month) - 1;
    const yearNum = parseInt(year);

    const startDate = new Date(yearNum, monthNum, 1);
    const endDate = new Date(yearNum, monthNum + 1, 1);

    let query = {};

    if (user.role === "employee") {
      query.assignedEmployee = user._id;
    } else if (user.role === "manager") {
      const managedEmployees = await User.find({ manager: user._id }, "_id");
      const employeeIds = managedEmployees.map((emp) => emp._id);

      if (employeeIds.length > 0) {
        query.assignedEmployee = { $in: employeeIds };
      } else {
        return res.status(200).json({ success: true, graphData: [] });
      }
    }

    const graphData = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
          ...query,
          approvedBYHigher: true,
        },
      },
      {
        $group: {
          _id: "$state",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          state: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({ success: true, graphData });
  } catch (error) {
    console.error("Error fetching booking count:", error);
    return res.status(500).json({ success: false, error: "Server error" });
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
  userProfileById,
  BookingUpdate,
  BookingSearch,
  replyContact,
  deleteContact,
  changePassword,
  bookingReminder,
  bookingCount,
};
