const express = require("express");
const requireManager = require("../../middlewares/requireManager");
const {
  AddMaterial,
  getMaterials,
  getMaterialsById,
  updateMaterial,
} = require("../../Controllers/admin/studyMaterials");
const router = express.Router();

router.get("", getMaterials);
router.post("", requireManager, AddMaterial);
router.get("/:id", getMaterialsById);
router.put("/:id", updateMaterial);
// router.delete("/:id", authenticateToken, deleteMaterial);

module.exports = router;
