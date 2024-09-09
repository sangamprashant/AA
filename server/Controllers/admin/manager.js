const User = require("../../Models/users");
const Booking = require("../../Models/bookings");

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

const managerBookingCount = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({
        message: "Access denied. Only managers can access this route.",
        success: false,
      });
    }

    const { type } = req.query;

    const query = {};
    query.approvedBYHigher = false;
    const managedEmployees = await User.find({ manager: req.user.id }, "_id");
    if (managedEmployees.length > 0) {
      const employeeIds = managedEmployees.map((emp) => emp._id);
      query.assignedEmployee = { $in: employeeIds };
    } else {
      return res.status(200).json([]);
    }

    if (type === "count") {
      const total = await Booking.countDocuments(query);
      res.status(200).json(total);
    } else {
      const bookings = await Booking.find(query)
        .populate("assignedEmployee", "firstName lastName email")
        .sort({ createdAt: -1 });
      res.status(200).json(bookings);
    }
  } catch (err) {
    console.error("Error fetching booking count:", err);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const managerApprove = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({
        message: "Access denied. Only managers can access this route.",
        success: false,
      });
    }

    const { id } = req.params;
    const query = {};

    const managedEmployees = await User.find({ manager: req.user.id }, "_id");
    if (managedEmployees.length > 0) {
      const employeeIds = managedEmployees.map((emp) => emp._id);
      query.assignedEmployee = { $in: employeeIds };
    } else {
      return res.status(200).json([]);
    }

    const booking = await Booking.findOne({ _id: id, ...query });
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }

    if (booking.approvedBYHigher) {
      return res.status(400).json({
        message: "Booking already approved",
        success: false,
      });
    }

    booking.approvedBYHigher = true;
    await booking.save();

    const user = await User.findOne({
      _id: booking.assignedEmployee,
    });

    if (user) {
      user.addNotification("Your lead has been approved.");
    }

    // Send success response
    res.status(200).json({
      message: "Booking approved",
      success: true,
    });
  } catch (err) {
    console.error("Error approving booking:", err);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const managerDeleteLeads = async (req, res) => {
  try {
    const id = req.params.id;
    const query = {};

    const managedEmployees = await User.find({ manager: req.user.id }, "_id");
    if (managedEmployees.length > 0) {
      const employeeIds = managedEmployees.map((emp) => emp._id);
      query.assignedEmployee = { $in: employeeIds };
    } else {
      return res.status(200).json([]);
    }

    const booking = await Booking.findOneAndDelete({ _id: id, ...query });
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        success: false,
      });
    }
    if (booking.approvedBYHigher) {
      return res.status(400).json({
        message: "Booking already approved",
        success: false,
      });
    }
    const user = await User.findOne({
      _id: booking.assignedEmployee,
    });
    if (user) {
      user.addNotification("Your lead has been rejected.");
    }
    // Send success response
    res.status(200).json({
      message: "Booking deleted",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  managerGetUsers,
  managerBookingCount,
  managerApprove,
  managerDeleteLeads,
};
