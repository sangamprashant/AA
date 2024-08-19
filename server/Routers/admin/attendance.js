const express = require("express");
const {
  getCurrentMonthAttendance,
  getMonthlyAttendance,
} = require("../../Controllers/admin/attendance");
const authenticateToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("/current-month", authenticateToken, getCurrentMonthAttendance);
router.get("/monthly", authenticateToken, getMonthlyAttendance);

module.exports = router;
