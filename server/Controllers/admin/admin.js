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

const adminDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Cannot delete an admin user", success: false });
    }
    await User.findByIdAndDelete(id);
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

module.exports = { adminGetUsers, registerUser, adminDeleteUser };
