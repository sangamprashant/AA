const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdfUrl: { type: String,  },
    imageUrl: { type: String,  },
    content: { type: String,  },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    free: { type: Boolean, default: true },
    likes: { type: Number, default: 0 },
    unlikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

module.exports = StudyMaterial;
