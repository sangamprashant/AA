const express = require("express");
const authenticateToken = require("../../middlewares/authMiddleware");
const {
  checkAuth,
  register,
  login,
  BookingId,
  BookingType,
  ContactsByType,
  logout,
} = require("../../Controllers/admin/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticateToken, logout);
router.get("/check", authenticateToken, checkAuth);
router.get("/booking/:bookingId", authenticateToken, BookingId);
// geting loged users leads by type
router.post("/bookings", authenticateToken, BookingType);
router.get("/contacts", authenticateToken, ContactsByType);


module.exports = router;
