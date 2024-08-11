const express = require("express");
const {
  employeeGetTheirBookings,
} = require("../../Controllers/admin/employee");
const requireEmployee = require("../../middlewares/requireEmployee");

const router = express.Router();

router.get("/bookings", requireEmployee, employeeGetTheirBookings);

module.exports = router;
