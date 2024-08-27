const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
