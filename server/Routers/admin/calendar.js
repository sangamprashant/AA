const express = require("express");
const { addAnnualCalendar } = require("../../Controllers/admin/calendar");
const requireAdmin = require("../../middlewares/requireAdmin");
const router = express.Router();

router.post("/add-event", requireAdmin, addAnnualCalendar);

module.exports = router;
