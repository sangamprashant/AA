const StudyMaterial = require("../../Models/studyMaterials");

const getMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ createdAt: -1 });

    res.status(200).json({
      materials,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get study material", error, success: false });
  }
};

const getMaterialsById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    res.status(200).json({
      material,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get study material",
      error,
      success: false,
    });
  }
};

const like = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
      return res
        .status(404)
        .json({ message: "Study material not found", success: false });
    }

    if (req.body.action === "addLike") {
      material.likes += 1;
    } else if (req.body.action === "removeLike") {
      material.likes = Math.max(0, material.likes - 1);
    }

    await material.save();
    res.status(200).json({ material, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update like status", error, success: false });
  }
};

const unlike = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
      return res
        .status(404)
        .json({ message: "Study material not found", success: false });
    }

    if (req.body.action === "addUnlike") {
      material.unlikes += 1;
    } else if (req.body.action === "removeUnlike") {
      material.unlikes = Math.max(0, material.unlikes - 1); // Prevent negative unlikes
    }

    await material.save();
    res.status(200).json({ material, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update unlike status",
      error,
      success: false,
    });
  }
};

const AddMaterial = async (req, res) => {
  try {
    const { title, pdf, image, content, category, free } = req.body;

    const newStudyMaterial = new StudyMaterial({
      title,
      pdfUrl: pdf,
      imageUrl: image,
      content,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      free,
    });

    await newStudyMaterial.save();
    res
      .status(201)
      .json({ message: "Study material added successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add study material", error, success: false });
  }
};

const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const { title, pdf, image, content, category, free } = req.body; // Get the updated data from the request body

    // Find the study material by ID and update it with the new data
    const updatedStudyMaterial = await StudyMaterial.findByIdAndUpdate(
      id,
      {
        title,
        pdfUrl: pdf,
        imageUrl: image,
        content,
        category,
        updatedAt: new Date(),
        free,
      },
      { new: true } // Return the updated document
    );

    if (!updatedStudyMaterial) {
      return res
        .status(404)
        .json({ message: "Study material not found", success: false });
    }

    res.status(200).json({
      message: "Study material updated successfully",
      success: true,
      data: updatedStudyMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update study material",
      error,
      success: false,
    });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudyMaterial = await StudyMaterial.findByIdAndDelete(id);

    if (!deletedStudyMaterial) {
      return res
        .status(404)
        .json({ message: "Study material not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Study material deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete study material",
      error,
      success: false,
    });
  }
};

module.exports = {
  AddMaterial,
  getMaterials,
  getMaterialsById,
  like,
  unlike,
  updateMaterial,
  deleteMaterial,
};
