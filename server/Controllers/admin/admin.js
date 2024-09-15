const Booking = require("../../Models/bookings");
const Leave = require("../../Models/leave");
const User = require("../../Models/users");

const registerUser = async (req, res) => {
  const { email, password, role, name, manager, subject } = req.body;

  // Input validation
  if (!email || !password || !role || !name) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use", success: false });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
      role,
      name,
      subject: subject || undefined,
      manager: manager || undefined,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Fetch all users excluding those with the 'admin' role
const adminGetUsers = async (req, res) => {
  try {
    // Fetch users excluding the 'admin' role and excluding the 'notifications' 'attendanceRecords' field
    const users = await User.find({ role: { $ne: "admin" } })
      .select("-notifications -attendanceRecords")
      .populate({
        path: "manager",
        select: "name email",
        match: { role: "manager" },
      });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const adminGetUsersCount = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: { role: { $ne: "admin" } },
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          role: "$_id",
          count: 1,
        },
      },
    ]);

    // Convert result array to key-value object
    const roleCounts = result.reduce((acc, { role, count }) => {
      acc[role] = count;
      return acc;
    }, {});

    res.json(roleCounts);
  } catch (error) {
    console.error("Error fetching users count:", error);
    res.status(500).json({ message: "Error fetching users count" });
  }
};

const adminDeleteUser = async (req, res) => {
  const { id } = req.params;
  const { replacementId } = req.query;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Prevent deletion of admin users
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot delete an admin user", success: false });
    }

    // Handle deletion for teachers
    if (user.role === "teacher") {
      await User.findByIdAndDelete(id);
    } else {
      // Ensure replacementId is provided for non-teachers
      if (!replacementId) {
        return res
          .status(400)
          .json({ message: "Replacement ID is required.", success: false });
      }

      if (user.role === "employee") {
        await handleEmployeeDeletion(id, replacementId);
      }

      if (user.role === "manager") {
        await handleManagerDeletion(id, replacementId);
      }

      await User.findByIdAndDelete(id);
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user", success: false, error });
  }
};
// for adminDeleteUser
const handleEmployeeDeletion = async (userId, replacementId) => {
  try {
    // Find and update user bookings
    const userBookings = await Booking.find({
      assignedEmployee: userId,
    }).select("assignedEmployee allocationDate");
    const updateBookingsPromises = userBookings.map((booking) => {
      booking.assignedEmployee = replacementId;
      booking.allocationDate = Date.now();
      return booking.save(); // Save each updated booking
    });
    await Promise.all(updateBookingsPromises);

    // Find and delete user leaves
    const leaves = await Leave.find({ requester: userId });
    const deleteLeavesPromises = leaves.map((leave) => leave.remove());
    await Promise.all(deleteLeavesPromises);

    const user = await User.findById(userId).select("name");

    // Notify replacement user
    const replacementUser = await User.findById(replacementId);
    if (replacementUser) {
      replacementUser.addNotification(
        `You have been assigned new responsibilities previously handled by user: ${user.name}.`
      );
    }
  } catch (error) {
    console.error(
      `Error handling employee deletion for userId: ${userId}`,
      error
    );
    throw error; // Re-throw error to be handled by the calling function
  }
};
// for adminDeleteUser
const handleManagerDeletion = async (userId, replacementId) => {
  try {
    // Find and delete user leaves
    const leaves = await Leave.find({ requester: userId });
    const deleteLeavesPromises = leaves.map((leave) => leave.remove());
    await Promise.all(deleteLeavesPromises);

    // Reassign manager tasks
    const managedUsers = await User.find({ manager: userId }).select("manager");
    const updateManagedUsersPromises = managedUsers.map((user) => {
      user.manager = replacementId;
      return user.save();
    });
    await Promise.all(updateManagedUsersPromises);

    // Reassign tasks for employees where the user is the approver
    const employeeLeaves = await Leave.find({ approver: userId }).select(
      "approver"
    );
    const updateEmployeeLeavesPromises = employeeLeaves.map((leave) => {
      leave.approver = replacementId;
      return leave.save();
    });
    await Promise.all(updateEmployeeLeavesPromises);

    const user = await User.findById(userId).select("name");

    // Notify replacement user
    const replacementUser = await User.findById(replacementId);
    if (replacementUser) {
      replacementUser.addNotification(
        `You have been assigned new responsibilities previously handled by manager: ${user.name}.`
      );
    }
  } catch (error) {
    console.error(
      `Error handling manager deletion for userId: ${userId}`,
      error
    );
    throw error; // Re-throw error to be handled by the calling function
  }
};

const updateUsersProfile = async (req, res) => {
  try {
    const { id } = req.query;
    const { email } = req.body;

    if (email) {
      const existingUser = await User.findOne({ email: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({
          message: "Email is already in use by another user",
          success: false,
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("name email password role createdAt");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: updatedUser,
      message: "Profile updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
};

module.exports = {
  adminGetUsers,
  registerUser,
  adminDeleteUser,
  adminGetUsersCount,
  updateUsersProfile,
};
