const express = require("express");
const { addAnnualCalendar, getMonthlyData } = require("../../Controllers/admin/calendar");
const requireAdmin = require("../../middlewares/requireAdmin");
const authenticateToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/add-event", requireAdmin, addAnnualCalendar);
router.get("/monthly-event", authenticateToken, getMonthlyData);

module.exports = router;
