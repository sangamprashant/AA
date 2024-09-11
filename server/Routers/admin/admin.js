const express = require("express");
const requireAdmin = require("../../middlewares/requireAdmin");
const {
  registerUser,
  adminGetUsers,
  adminDeleteUser,
  adminGetUsersCount,
  updateUsersProfile,
} = require("../../Controllers/admin/admin");

const router = express.Router();

router.post("/user", requireAdmin, registerUser);
router.get("/users", requireAdmin, adminGetUsers);
router.get("/user-count", requireAdmin, adminGetUsersCount);
router.delete("/user/:id", requireAdmin, adminDeleteUser);
router.post("/user-update-profile", requireAdmin, updateUsersProfile);

module.exports = router;
