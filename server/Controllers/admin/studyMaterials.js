const StudyMaterial = require("../../Models/studyMaterials");

const getMaterials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const materials = await StudyMaterial.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
    const { id } = req.params; // Get the ID from the request parameters
    const studyMaterial = await StudyMaterial.findByIdAndDelete(id); // Find and delete the study material
    if (!studyMaterial) {
      return res
        .status(404)
        .json({ message: "Study material not found", success: false });
    }
    res.status(200).json({
      message: "Study material deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete study material",
      error,
      success: false,
    });
  }
};

module.exports = {
  getMaterials,
  AddMaterial,
  getMaterialsById,
  updateMaterial,
  deleteMaterial,
};
