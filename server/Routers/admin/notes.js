const express = require("express");
const requireAdmin = require("../../middlewares/requireAdmin");
const Note = require("../../Models/notes");
const requireTeacher = require("../../middlewares/requireTeacher");
const User = require("../../Models/users");
const authenticateToken = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("", requireAdmin, async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();

    return res
      .status(201)
      .json({ message: "Note created successfully", success: true, note });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

router.get("", authenticateToken, async (req, res) => {
  try {
    let notes;
    if (req.query.role === "admin") {
      if (!req.user || req.user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Access denied", success: false });
      }
      notes = await Note.find().populate("subject", "title");
    } else if (req.query.role === "teacher") {
      if (!req.user || req.user.role !== "teacher") {
        return res
          .status(403)
          .json({ message: "Access denied", success: false });
      }
      const teacher = await User.findById(req.user.id).select("subject");
      notes = await Note.find({
        subject: teacher.subject,
      }).populate("subject", "title");
    } else {
      return res
        .status(400)
        .json({ message: "Invalid role specified", success: false });
    }
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

router.get("/toggle-save", requireTeacher, async (req, res) => {
  try {
    const { noteId } = req.query;
    const { id } = req.user;

    const user = await User.findById(id).select("savedNotes");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    await user.toggleSavedNote(noteId);
    const note = await Note.findById(noteId);

    return res
      .status(200)
      .json({ success: true, savedNotes: user.savedNotes, note });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

router.get("/saved-notes", requireTeacher, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("savedNotes")
      .populate({
        path: "savedNotes",
        select: "title pdfUrl subject",
      });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Since `user.savedNotes` is already populated, you don't need to refetch them.
    return res.status(200).json({ success: true, notes: user.savedNotes });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id).populate("subject", "title");
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found", success: false });
    }
    return res.status(200).json({ success: true, note });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
