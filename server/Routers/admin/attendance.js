const express = require("express");
const {
  getCurrentMonthAttendance,
  getMonthlyAttendance,
  getActiveTimeForMonth,
  adminDailyAttendance,
  getMonthlyAttendanceProfile,
  getActiveTimeForMonthProfile,
} = require("../../Controllers/admin/attendance");
const authenticateToken = require("../../middlewares/authMiddleware");
const requireAdmin = require("../../middlewares/requireAdmin");
const requireManagerOrAdmin = require("../../middlewares/requireManagerOrAdmin");
const router = express.Router();

router.get("/current-month", authenticateToken, getCurrentMonthAttendance);
router.get("/monthly", authenticateToken, getMonthlyAttendance);
router.get("/active-time-for-month", authenticateToken, getActiveTimeForMonth);
// Helper function to convert date to Indian Standard Time (IST)

// Route to get daily attendance summary
router.get("/daily", requireAdmin, adminDailyAttendance);
router.get("/monthly/profile-attendance", requireManagerOrAdmin, getMonthlyAttendanceProfile);
router.get("/active-time-for-month/profile-attendance", authenticateToken, getActiveTimeForMonthProfile);

module.exports = router;
