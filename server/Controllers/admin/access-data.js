const AccessData = require("../../Models/access-data");

const viewAccessByCategory = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.body; // Default page to 1 and limit to 10
    const query = {};

    switch (category) {
      case "v":
        query.verified = true;
        break;
      case "r":
        query.reached = true;
        break;
      case "v-r":
        query.verified = true;
        query.reached = true;
        break;
      case "v-nr":
        query.verified = true;
        query.reached = false;
        break;
      case "nv-r":
        query.verified = false;
        query.reached = true;
        break;
      case "nv-nr":
        query.verified = false;
        query.reached = false;
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid category", success: false });
    }

    const users = await AccessData.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await AccessData.countDocuments(query); // Total number of documents
    return res.status(200).json({ users, totalUsers, success: true });
  } catch (error) {
    console.error("Error viewing access by category:", error);
    return res
      .status(500)
      .json({ message: "Server error", success: false, error });
  }
};

const updateReachedStatus = async (req, res) => {
  const { id } = req.query;

  try {
    const user = await AccessData.findOneAndUpdate(
      { _id: id },
      { reached: true },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User reached status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating reached status:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
};

module.exports = {
  viewAccessByCategory,
  updateReachedStatus,
};
