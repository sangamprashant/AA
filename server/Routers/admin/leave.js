const express = require("express");
const {
  applyForLeave,
  managerApprovesEmployeeLeave,
  adminApprovesManagerLeave,
  monthlyRequestStatusFiltered,
  userGetTheirApplications,
} = require("../../Controllers/admin/leave");
const authenticateToken = require("../../middlewares/authMiddleware");
const requireManager = require("../../middlewares/requireManager");
const requireAdmin = require("../../middlewares/requireAdmin");
const requireManagerOrAdmin = require("../../middlewares/requireManagerOrAdmin");

const router = express.Router();

router.post("/apply", authenticateToken, applyForLeave);
router.get("/applications", authenticateToken, userGetTheirApplications);

router.get("/manager/approves", requireManager, managerApprovesEmployeeLeave);
router.get("/admin/approves", requireAdmin, adminApprovesManagerLeave);
router.get("/monthly/requests", requireManagerOrAdmin, monthlyRequestStatusFiltered);

module.exports = router;
