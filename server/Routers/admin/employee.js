const express = require("express");
const {
  employeeGetTheirBookings,
  employeeCreateBooking,
} = require("../../Controllers/admin/employee");
const requireEmployee = require("../../middlewares/requireEmployee");

const router = express.Router();

router.get("/bookings", requireEmployee, employeeGetTheirBookings);
router.post("/booking", requireEmployee, employeeCreateBooking);

module.exports = router;
