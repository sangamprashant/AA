const express = require("express");
const {
  userGetsTheirNotificationsAndUnSeenCount,
} = require("../../Controllers/admin/notifications");
const authenticateToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.get("", authenticateToken, userGetsTheirNotificationsAndUnSeenCount);

module.exports = router;
