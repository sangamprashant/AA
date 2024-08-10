const express = require("express");
const requireAdmin = require("../../middlewares/requireAdmin");
const {
  registerUser,
  adminGetUsers,
} = require("../../Controllers/admin/admin");

const router = express.Router();

router.post("/user", requireAdmin, registerUser);
router.get("/users", requireAdmin, adminGetUsers);

module.exports = router;
