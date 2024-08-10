const express = require("express");
const authenticateToken = require("../../middlewares/authMiddleware");
const {
  sendOtp,
  verifyOtp,
  viewAccessByCategory,
  updateReachedStatus,
} = require("../../Controllers/public/access-data");
const router = express.Router();

router.post("", sendOtp);
router.post("/verify", verifyOtp);
// for admin
router.post("/view", authenticateToken, viewAccessByCategory);
router.post("/update-reached", authenticateToken, updateReachedStatus);

module.exports = router;
