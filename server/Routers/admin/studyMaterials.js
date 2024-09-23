const express = require("express");
const requireManager = require("../../middlewares/requireManager");
const {
  AddMaterial,
  getMaterials,
  getMaterialsById,
  updateMaterial,
  deleteMaterial,
} = require("../../Controllers/admin/studyMaterials");
const requireAdmin = require("../../middlewares/requireAdmin");
const requireManagerOrAdmin = require("../../middlewares/requireManagerOrAdmin");
const router = express.Router();

router.get("", requireManagerOrAdmin, getMaterials);
router.post("", requireManager, AddMaterial);
router.get("/:id", requireManagerOrAdmin, getMaterialsById);
router.put("/:id", requireManagerOrAdmin, updateMaterial);
router.delete("/:id", requireAdmin, deleteMaterial);

module.exports = router;
