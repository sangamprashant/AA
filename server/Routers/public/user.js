const express = require("express");
const { validateLogin, validateChangeEmail, changeEmail, validateChangePassword, changePassword, login } = require("../../Controllers/public/user");
const authenticateToken = require("../../middlewares/authMiddleware");

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
