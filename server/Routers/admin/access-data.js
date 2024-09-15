const express = require("express");
const { viewAccessByCategory, updateReachedStatus } = require("../../Controllers/admin/access-data");
const requireManager = require("../../middlewares/requireManager");

const router = express.Router();

router.post("/view", requireManager, viewAccessByCategory);
router.get("/update-reached", requireManager, updateReachedStatus);

module.exports = router;