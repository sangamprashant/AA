const express = require("express");
const { sendOtp, verifyOtp } = require("../../Controllers/public/access-data");
const router = express.Router();

router.post("", sendOtp);
router.post("/verify", verifyOtp);

module.exports = router;
