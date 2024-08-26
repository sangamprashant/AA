const User = require("../../Models/users");
const moment = require("moment-timezone");

const addAnnualCalendar = async (req, res) => {
  try {
    const { id } = req.user; // User ID from request user object
    const { date, status, description } = req.body;

    // Validate input
    if (!date || !status) {
      return res.status(400).json({ message: "Date and status are required" });
    }

    // Convert date to Asia/Kolkata time zone and format as YYYY-MM-DD
    const localDate = moment.tz(date, "Asia/Kolkata").format("YYYY-MM-DD");

    // Find the current user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if an entry already exists for this date
    const existingEntry = user.annualCalendar.find(
      (entry) => entry.date === localDate
    );
    if (existingEntry) {
      // Update existing entry
      existingEntry.status = status;
      existingEntry.details = description;
    } else {
      // Add new entry
      user.annualCalendar.push({ date: localDate, status, details:description });
    }

    // Save the user's updated annual calendar
    await user.save();

    // Handle attendance records for all users if the status is "off" or "holiday"
    if (status === "off" || status === "holiday") {
      const allUsers = await User.find();

      for (let eachUser of allUsers) {
        // Find if the user already has an attendance record for this date
        const existingAttendance = eachUser.attendanceRecords.find(
          (record) =>
            moment(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD") ===
            localDate
        );

        // Skip if the user already has a leave marked on this date
        if (existingAttendance && existingAttendance.status.includes("leave")) {
          continue;
        }

        // Update or add attendance record for the "off" or "holiday" date
        if (existingAttendance) {
          existingAttendance.status = status;
          existingAttendance.details = description;
        } else {
          eachUser.attendanceRecords.push({
            date: localDate,
            status,
            details:description,
          });
        }

        // Handle sandwich leave logic
        const previousDate = moment(localDate)
          .subtract(1, "days")
          .format("YYYY-MM-DD");
        const nextDate = moment(localDate).add(1, "days").format("YYYY-MM-DD");

        const previousAttendance = eachUser.attendanceRecords.find(
          (record) =>
            moment(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD") ===
            previousDate
        );
        const nextAttendance = eachUser.attendanceRecords.find(
          (record) =>
            moment(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD") ===
            nextDate
        );

        if (
          previousAttendance &&
          nextAttendance &&
          previousAttendance.status.includes("leave") &&
          nextAttendance.status.includes("leave")
        ) {
          if (existingAttendance) {
            existingAttendance.status = "unpaid-leave";
          }
        }

        await eachUser.save();
      }
    }

    res.status(200).json({ message: "Annual calendar updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addAnnualCalendar,
};
