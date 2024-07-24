const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  AddMaterial,
  getMaterials,
  getMaterialsById,
  like,
  unlike,
  updateMaterial,
  deleteMaterial,
} = require("../Controllers/studyMaterials");

const router = express.Router();

//public/all
router.get("", getMaterials);
router.get("/:id", getMaterialsById);
router.get("/:id/like", like);
router.get("/:id/unlike", unlike);
// admin
router.post("", authenticateToken, AddMaterial);
router.put("/:id", authenticateToken, updateMaterial);
router.delete("/:id", authenticateToken, deleteMaterial);
// delete is remaining bass

module.exports = router;
