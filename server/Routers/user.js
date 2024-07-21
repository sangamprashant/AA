const express = require("express");
const {
  register,
  login,
  logout,
  validateRegister,
  validateLogin,
  validateChangeEmail,
  validateChangePassword,
  changeEmail,
  changePassword,
} = require("../Controllers/user");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/change-email", authenticateToken, validateChangeEmail, changeEmail);
router.post("/change-password", authenticateToken, validateChangePassword, changePassword);

module.exports = router;
