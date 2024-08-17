const express = require("express");
const requireManager = require("../../middlewares/requireManager");
const { managerGetUsers } = require("../../Controllers/admin/manager");
const router = express.Router();

// Route to get employees managed by a manager
router.get("/employees", requireManager, managerGetUsers);

module.exports = router;