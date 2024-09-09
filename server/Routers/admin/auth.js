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
  BookingSearch,
  replyContact,
  deleteContact,
  changePassword,
} = require("../../Controllers/admin/auth");
const requireManagerOrAdmin = require("../../middlewares/requireManagerOrAdmin");
const requireAdmin = require("../../middlewares/requireAdmin");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticateToken, logout);
router.post("/change-password", authenticateToken, changePassword);
router.get("/check", authenticateToken, checkAuth);
router.get("/booking/:bookingId", authenticateToken, BookingId);
router.put("/booking/:id", authenticateToken, BookingUpdate);
router.post("/bookings", authenticateToken, BookingType);
router.get("/bookings/search", authenticateToken, BookingSearch);
router.get("/contacts", authenticateToken, ContactsByType);
router.post("/contact/reply/:id", requireManagerOrAdmin, replyContact);
router.delete("/contact/delete/:id", requireAdmin, deleteContact);
router.get("/user-profile/:id", requireManagerOrAdmin, userProfileById);

module.exports = router;
