const express = require("express");
const requireManager = require("../../middlewares/requireManager");
const {
  managerGetUsers,
  managerBookingCount,
  managerApprove,
  managerDeleteLeads,
} = require("../../Controllers/admin/manager");
const router = express.Router();

// Route to get employees managed by a manager
router.get("/employees", requireManager, managerGetUsers);
router.get("/bookings/count", requireManager, managerBookingCount);
router.delete("/booking/:id", requireManager, managerDeleteLeads);
router.patch("/booking/approve/:id", requireManager, managerApprove);

module.exports = router;
