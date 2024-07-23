const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  unlikes: { type: Number, default: 0 },
});
const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

module.exports = StudyMaterial;
