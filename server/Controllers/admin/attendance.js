const User = require("../../Models/users");
const moment = require("moment-timezone");

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
      "attendanceRecords.date": { $gte: startDate, $lte: endDate },
    }).select("name email attendanceRecords");

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found or no attendance records for the current month",
      });
    }

    // Filter and format the attendance records for the current month
    const currentMonthRecords = user.attendanceRecords.filter(
      (record) =>
        new Date(record.date) >= startDate && new Date(record.date) <= endDate
    );

    res.status(200).json({
      success: true,

      attendanceRecords: currentMonthRecords,
    });
  } catch (error) {
    console.error("Error fetching current month's attendance:", error);
    res.status(500).json({
      message: "Error fetching attendance records",
      success: false,
    });
  }
};

const getMonthlyAttendance = async (req, res) => {
  try {
    const { id } = req.user;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required",
      });
    }

    // Ensure month is zero-based
    const monthIndex = parseInt(month, 10) - 1;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    // Fetch the user with attendance records for the current month
    const user = await User.findOne({
      _id: id,
      "attendanceRecords.date": { $gte: startDate, $lte: endDate },
    }).select("name email attendanceRecords");

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found or no attendance records for the current month",
      });
    }

    // Filter and format the attendance records for the current month
    const currentMonthRecords = user.attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });

    // console.log({currentMonthRecords})

    res.status(200).json({
      success: true,
      attendanceRecords: currentMonthRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getActiveTimeForMonth = async (req, res) => {
  try {
    const { id } = req.user;
    const { year, month } = req.query; // Get year and month from request parameters

    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required." });
    }

    // Define the time zone
    const timeZone = "Asia/Kolkata";

    // Convert dates to Kolkata time zone
    const startDate = moment
      .tz(`${year}-${month}-01`, timeZone)
      .startOf("day")
      .toDate(); // Start of the month
    const endDate = moment
      .tz(`${year}-${month}-01`, timeZone)
      .endOf("month")
      .toDate(); // End of the month

    // Query to get user's attendance records within the date range
    const user = await User.findById(id).select("attendanceRecords");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const dailyActivity = {};

    // Aggregate active time for the user
    user.attendanceRecords.forEach((record) => {
      const recordDateObj = moment(record.date).tz(timeZone).toDate(); // Ensure record date is in the same time zone
      const recordDate = moment(record.date).tz(timeZone).format("YYYY-MM-DD");

      if (recordDateObj >= startDate && recordDateObj <= endDate) {
        const { activeTime } = record;
        if (!dailyActivity[recordDate]) {
          dailyActivity[recordDate] = 0;
        }
        if (activeTime) {
          const { minutes } = activeTime;
          dailyActivity[recordDate] += minutes / 60;
        }
      }
    });

    const graphData = Object.keys(dailyActivity).map((date) => ({
      name: date,
      activeHours: dailyActivity[date],
    }));

    res.json({ success: true, graphData: graphData.reverse() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Route handler for getting daily attendance summary
const adminDailyAttendance = async (req, res) => {
  try {
    // Get today's date in IST
    const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

    // Find all users who are not admins
    const users = await User.find({ role: { $ne: "admin" } });

    // Initialize counts
    let totalEmployees = 0;
    let presentEmployees = 0;
    let lateEmployees = 0;
    let earlyEmployees = 0;
    let absentEmployees = 0;
    let halfDayLeaveEmployees = 0;
    let remoteWorkEmployees = 0;
    let offEmployees = 0;
    let holidayEmployees = 0;
    let trainingEmployees = 0;
    let unpaidLeaveEmployees = 0;
    let meetingEmployees = 0;

    for (const user of users) {
      totalEmployees++;
      const todayAttendance = user.attendanceRecords.find(
        (record) =>
          moment(record.date).tz("Asia/Kolkata").format("YYYY-MM-DD") === today
      );

      if (todayAttendance) {
        switch (todayAttendance.status) {
          case "present":
            presentEmployees++;
            // Check if the employee is late or early
            if (todayAttendance.activeTime?.loginTime) {
              const loginTime = moment(todayAttendance.activeTime.loginTime)
                .tz("Asia/Kolkata")
                .toDate();
              const expectedLoginTime = moment(today)
                .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
                .toDate();

              if (loginTime > expectedLoginTime) {
                lateEmployees++;
              } else if (loginTime < expectedLoginTime) {
                earlyEmployees++;
              }
            }
            break;
          case "late":
            lateEmployees++;
            break;
          case "early":
            earlyEmployees++;
            break;
          case "half-day-leave":
            halfDayLeaveEmployees++;
            break;
          case "remote-work":
            remoteWorkEmployees++;
            break;
          case "off":
            offEmployees++;
            break;
          case "holiday":
            holidayEmployees++;
            break;
          case "training":
            trainingEmployees++;
            break;
          case "unpaid-leave":
            unpaidLeaveEmployees++;
            break;
          case "meeting":
            meetingEmployees++;
            break;
          default:
            break;
        }
      } else {
        // If no attendance record exists for today, mark as absent
        absentEmployees++;
      }
    }

    res.json({
      totalEmployees,
      presentEmployees,
      lateEmployees,
      earlyEmployees,
      absentEmployees,
      halfDayLeaveEmployees,
      remoteWorkEmployees,
      offEmployees,
      holidayEmployees,
      trainingEmployees,
      unpaidLeaveEmployees,
      meetingEmployees,
    });
  } catch (error) {
    console.error("Error fetching daily attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for profile
const getMonthlyAttendanceProfile = async (req, res) => {
  try {
    const { year, month, id } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required",
      });
    }

    // Ensure month is zero-based
    const monthIndex = parseInt(month, 10) - 1;
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    // Fetch the user with attendance records for the current month
    const user = await User.findOne({
      _id: id,
      "attendanceRecords.date": { $gte: startDate, $lte: endDate },
    }).select("name email attendanceRecords");

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found or no attendance records for the current month",
      });
    }

    // Filter and format the attendance records for the current month
    const currentMonthRecords = user.attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });

    // console.log({currentMonthRecords})

    res.status(200).json({
      success: true,
      attendanceRecords: currentMonthRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getActiveTimeForMonthProfile = async (req, res) => {
  try {
    const { year, month, id } = req.query;

    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required." });
    }

    // Define the time zone
    const timeZone = "Asia/Kolkata";

    // Convert dates to Kolkata time zone
    const startDate = moment
      .tz(`${year}-${month}-01`, timeZone)
      .startOf("day")
      .toDate(); // Start of the month
    const endDate = moment
      .tz(`${year}-${month}-01`, timeZone)
      .endOf("month")
      .toDate(); // End of the month

    const user = await User.findById(id).select("attendanceRecords");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const dailyActivity = {};

    user.attendanceRecords.forEach((record) => {
      const recordDateObj = moment(record.date).tz(timeZone).toDate(); 
      const recordDate = moment(record.date).tz(timeZone).format("YYYY-MM-DD");

      if (recordDateObj >= startDate && recordDateObj <= endDate) {
        const { activeTime } = record;
        if (!dailyActivity[recordDate]) {
          dailyActivity[recordDate] = 0;
        }
        if (activeTime) {
          const { minutes } = activeTime;
          dailyActivity[recordDate] += minutes / 60;
        }
      }
    });

    const graphData = Object.keys(dailyActivity).map((date) => ({
      name: date,
      activeHours: dailyActivity[date],
    }));

    res.json({ success: true, graphData: graphData.reverse() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  getCurrentMonthAttendance,
  getMonthlyAttendance,
  getActiveTimeForMonth,
  adminDailyAttendance,
  getMonthlyAttendanceProfile,
  getActiveTimeForMonthProfile,
};
