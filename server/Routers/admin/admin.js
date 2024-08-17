const express = require("express");
const requireAdmin = require("../../middlewares/requireAdmin");
const {
  registerUser,
  adminGetUsers,
  adminDeleteUser,
} = require("../../Controllers/admin/admin");

const router = express.Router();

router.post("/user", requireAdmin, registerUser);
router.get("/users", requireAdmin, adminGetUsers);
router.delete("/user/:id", requireAdmin, adminDeleteUser);

module.exports = router;
