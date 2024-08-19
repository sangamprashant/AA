const User = require("../../Models/users");

const getCurrentMonthAttendance = async (req, res) => {
  try {
    const { id } = req.user; // Get the user ID from the authenticated user

    // Get the current date
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // January is 0, February is 1, etc.

    // Calculate the start and end dates of the current month
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    // Fetch the user with attendance records for the current month
    const user = await User.findOne({
      _id: id,
      "attendanceRecords.date": { $gte: startDate, $lte: endDate }
    }).select('name email attendanceRecords');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or no attendance records for the current month"
      });
    }

    // Filter and format the attendance records for the current month
    const currentMonthRecords = user.attendanceRecords.filter(record =>
      new Date(record.date) >= startDate && new Date(record.date) <= endDate
    );

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        attendanceRecords: currentMonthRecords
      }
    });
  } catch (error) {
    console.error("Error fetching current month's attendance:", error);
    res.status(500).json({
      message: "Error fetching attendance records",
      success: false
    });
  }
};


const getMonthlyAttendance = async (req, res) => {
  try {
    const { id } = req.user; // Get the user ID from the authenticated user
    const { year, month } = req.query; // Get year and month from query parameters

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required"
      });
    }

    // Ensure month is zero-based
    const monthIndex = parseInt(month, 10) - 1;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    // Fetch the user with attendance records for the current month
    const user = await User.findOne({
      _id: id,
      "attendanceRecords.date": { $gte: startDate, $lte: endDate }
    }).select('name email attendanceRecords');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or no attendance records for the current month"
      });
    }

    // Filter and format the attendance records for the current month
    const currentMonthRecords = user.attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        attendanceRecords: currentMonthRecords
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


module.exports = {getCurrentMonthAttendance,getMonthlyAttendance};
