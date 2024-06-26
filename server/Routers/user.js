const express = require("express");
const {
  register,
  login,
  validateRegister,
  validateLogin,
} = require("../Controllers/user");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
