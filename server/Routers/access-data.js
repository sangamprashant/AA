const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const { sendOtp, verifyOtp } = require("../Controllers/access-data");
const router = express.Router();

router.post("", sendOtp);
router.post("/verify", verifyOtp);

module.exports = router;
