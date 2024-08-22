const express = require("express");
const {
  userGetsTheirNotificationsAndUnSeenCount,
  markOneSeen,
  markAllSeen,
  clearAllNotifications,
} = require("../../Controllers/admin/notifications");
const authenticateToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("", authenticateToken, userGetsTheirNotificationsAndUnSeenCount);
router.get("/mark-as-seen", authenticateToken, markOneSeen);
router.get("/mark-all-as-seen", authenticateToken, markAllSeen);
router.get("/clear-all", authenticateToken, clearAllNotifications);

module.exports = router;
