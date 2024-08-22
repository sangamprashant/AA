const express = require("express");
const {
  getCurrentMonthAttendance,
  getMonthlyAttendance,
  getActiveTimeForMonth,
  usersLeaveRequest,
  adminDailyAttendance,
} = require("../../Controllers/admin/attendance");
const authenticateToken = require("../../middlewares/authMiddleware");
const requireAdmin = require("../../middlewares/requireAdmin");
const router = express.Router();

router.get("/current-month", authenticateToken, getCurrentMonthAttendance);
router.get("/monthly", authenticateToken, getMonthlyAttendance);
router.get("/active-time-for-month", authenticateToken, getActiveTimeForMonth);
router.get("/leave-requests", authenticateToken, usersLeaveRequest);
// Helper function to convert date to Indian Standard Time (IST)

// Route to get daily attendance summary
router.get("/daily", requireAdmin, adminDailyAttendance);

module.exports = router;
