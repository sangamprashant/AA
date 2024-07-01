const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  userCreateBooking,
  viewContact,
  replyContact,
  validateContact,
  validateReply,
  deleteContact,
} = require("../Controllers/contact");
const router = express.Router();

// Route to create a contact
router.post("/", validateContact, userCreateBooking);
// Route to view all contacts
router.get("/:status", authenticateToken, viewContact);
// Route to reply to a contact
router.post("/:id", authenticateToken, validateReply, replyContact);
// Route to delete contact
router.delete("/:id", authenticateToken, deleteContact);

module.exports = router;
