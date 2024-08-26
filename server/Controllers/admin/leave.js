const Leave = require("../../Models/leave");
const User = require("../../Models/users");
const moment = require("moment-timezone");

// Set default timezone to IST
const indianTimeZone = "Asia/Kolkata";

const applyForLeave = async (req, res) => {
  const { startDate, endDate, reason, type } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Apply for leave using the updated schema method
    await user.applyForLeave(
      new Date(startDate),
      new Date(endDate),
      reason,
      type
    );

    res.status(200).json({
      message: "Leave request submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const userGetTheirApplications = async (req, res) => {
  try {
    const { id } = req.user;
    const applications = await Leave.find({
      requester: id,
    }).sort({ createdAt: -1 }); 
    res.status(200).json({ applications, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const managerApprovesEmployeeLeave = async (req, res) => {
  try {
    const { id } = req.user;
    const { leaveId, status } = req.query;
    const manager = await User.findById(id);

    if (!manager) {
      return res
        .status(404)
        .json({ message: "Manager not found", success: false });
    }

    if (leaveId.toString() === manager._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot approve your own leave", success: false });
    }

    const leave = await Leave.findOne({ _id: leaveId, approver: manager._id });
    if (!leave) {
      return res
        .status(404)
        .json({ message: "Leave not found", success: false });
    }

    const requester = await User.findById(leave.requester);
    if (!requester) {
      return res
        .status(404)
        .json({ message: "Requester not found", success: false });
    }

    leave.status = status === "approved" ? "approved" : "rejected";
    await leave.save();

    if (leave.status === "approved") {
      // Update attendance records for each day within the leave period
      let currentDate = moment.tz(leave.startDate, indianTimeZone);
      const endDate = moment.tz(leave.endDate, indianTimeZone);

      while (currentDate.isSameOrBefore(endDate, "day")) {
        requester.attendanceRecords.push({
          date: currentDate.toDate(),
          status: leave.type,
          details: `Leave approved for ${leave.type} leave`,
        });
        currentDate.add(1, "day");
      }
      await requester.save();
    }

    requester.addNotification(`
      Your leave request from ${moment
        .tz(leave.startDate, indianTimeZone)
        .format("YYYY-MM-DD")} to ${moment
      .tz(leave.endDate, indianTimeZone)
      .format("YYYY-MM-DD")} was ${leave.status}.
    `);

    res.json({ message: "Leave status updated", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const adminApprovesManagerLeave = async (req, res) => {
  try {
    const { id } = req.user;
    const { leaveId, status } = req.query;

    const admin = await User.findById(id);
    if (!admin || admin.role !== "admin") {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }

    const leave = await Leave.findOne({ _id: leaveId, approverRole: "admin" });
    if (!leave) {
      return res
        .status(404)
        .json({ message: "Leave not found", success: false });
    }

    const manager = await User.findById(leave.requester);
    if (!manager || !["teacher", "manager"].includes(manager.role)) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }

    leave.status = status === "approved" ? "approved" : "rejected";
    leave.approverRole = admin.role;
    await leave.save();

    if (leave.status === "approved") {
      let currentDate = moment.tz(leave.startDate, indianTimeZone);
      const endDate = moment.tz(leave.endDate, indianTimeZone);

      while (currentDate.isSameOrBefore(endDate, "day")) {
        manager.attendanceRecords.push({
          date: currentDate.toDate(),
          status: "unpaid-leave",
          details: `Leave approved for ${leave.type} leave`,
        });
        currentDate.add(1, "day");
      }
      await manager.save();
    }

    manager.addNotification(`
      Your leave request from ${moment
        .tz(leave.startDate, indianTimeZone)
        .format("YYYY-MM-DD")} to ${moment
      .tz(leave.endDate, indianTimeZone)
      .format("YYYY-MM-DD")} was ${leave.status}.
    `);

    res.json({ message: "Leave status updated", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const monthlyRequestStatusFiltered = async (req, res) => {
  try {
    const { id } = req.user;
    const { year, month, status } = req.query;

    // Calculate the start of the month
    const startDate = moment
      .tz(`${year}-${month}-01`, "YYYY-MM-DD", indianTimeZone)
      .startOf("month")
      .toDate();

    // Calculate the end of the month
    const endDate = moment
      .tz(`${year}-${month}-01`, "YYYY-MM-DD", indianTimeZone)
      .endOf("month")
      .toDate();

    // Query to find leaves
    const leaves = await Leave.find({
      approver: id,
      status: status,
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("requester", "name");

    console.log(leaves);

    res.json({ leaves, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  applyForLeave,
  managerApprovesEmployeeLeave,
  adminApprovesManagerLeave,
  monthlyRequestStatusFiltered,
  userGetTheirApplications,
};
