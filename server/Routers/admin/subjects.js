const express = require("express");
const Subject = require("../../Models/subject");
const requireAdmin = require("../../middlewares/requireAdmin");
const authenticateToken = require("../../middlewares/authMiddleware");
const router = express.Router();
// router to post a subject name
router.post("", requireAdmin, async (req, res) => {
  try {
    const { title } = req.body;
    const newSubject = new Subject({ title });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all subjects
router.get("", authenticateToken, async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a subject by ID
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { title },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Route to delete a subject by ID
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
