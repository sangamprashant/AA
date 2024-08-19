const express = require("express");
const {
  AddMaterial,
  getMaterials,
  getMaterialsById,
  like,
  unlike,
  updateMaterial,
  deleteMaterial,
} = require("../../Controllers/public/studyMaterials");

const router = express.Router();

//public/all
router.get("", getMaterials);
router.get("/:id", getMaterialsById);
router.get("/:id/like", like);
router.get("/:id/unlike", unlike);

module.exports = router;
