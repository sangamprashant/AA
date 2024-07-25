const express = require("express");
const {
  register,
  login,
  validateRegister,
  validateLogin,
  validateChangeEmail,
  validateChangePassword,
  changeEmail,
  changePassword,
} = require("../Controllers/user");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// commented to protect the route
// router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post(
  "/change-email",
  authenticateToken,
  validateChangeEmail,
  changeEmail
);
router.post(
  "/change-password",
  authenticateToken,
  validateChangePassword,
  changePassword
);

module.exports = router;
