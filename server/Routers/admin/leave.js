const express = require("express");
const { applyForLeave } = require("../../Controllers/admin/leave");
const authenticateToken = require("../../middlewares/authMiddleware");
const requireManager = require("../../middlewares/requireManager");

const router = express.Router();

router.post("/apply", authenticateToken, applyForLeave);

router.get('/manager/leave-requests', requireManager, async (req, res) => {
    try {
      const status = req.query.status; // e.g., 'approved', 'pending', 'rejected'
      const manager = await User.findById(req.user.id);
  
      if (!manager) return res.status(404).json({ error: "Manager not found." });
  
      const employeesWithLeaveRequests = await manager.managerGetsHisUsersWithLeaveRequests(status);
      
      res.json(employeesWithLeaveRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching leave requests." });
    }
  });
  

module.exports = router;
