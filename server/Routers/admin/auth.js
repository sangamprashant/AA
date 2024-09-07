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
  userProfileById,
  BookingUpdate,
} = require("../../Controllers/admin/auth");
const requireManagerOrAdmin = require("../../middlewares/requireManagerOrAdmin");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticateToken, logout);
router.get("/check", authenticateToken, checkAuth);
router.get("/booking/:bookingId", authenticateToken, BookingId);
router.put("/booking/:id", authenticateToken, BookingUpdate);
// geting loged users leads by type
router.post("/bookings", authenticateToken, BookingType);
router.get("/contacts", authenticateToken, ContactsByType);
router.get("/user-profile/:id", requireManagerOrAdmin, userProfileById);

module.exports = router;
