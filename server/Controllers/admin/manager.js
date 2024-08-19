const User = require("../../Models/users");

const managerGetUsers = async (req, res) => {
  try {
    // Check if the authenticated user is a manager
    if (req.user.role !== "manager") {
      return res.status(403).json({
        message: "Access denied. Only managers can access this route.",
        success: false,
      });
    }

    // Find all employees managed by the authenticated manager
    const managedEmployees = await User.find({ manager: req.user.id }).select(
      "-notifications -password -attendanceRecords"
    );

    res.status(200).json({
      success: true,
      users: managedEmployees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  managerGetUsers,
};
