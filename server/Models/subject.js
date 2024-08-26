const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
