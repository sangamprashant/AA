const express = require("express");
const {
  register,
  login,
  logout,
  validateRegister,
  validateLogin,
} = require("../Controllers/user");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

module.exports = router;
