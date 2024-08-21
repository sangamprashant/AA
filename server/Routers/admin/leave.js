const express = require("express");
const { applyForLeave } = require("../../Controllers/admin/leave");
const authenticateToken = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", authenticateToken, applyForLeave);

module.exports = router;
