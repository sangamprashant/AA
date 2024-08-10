const express = require("express");
const authenticateToken = require("../../middlewares/authMiddleware");
const { register, login, checkAuth } = require("../../controllers/admin/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check", authenticateToken, checkAuth);

module.exports = router;
