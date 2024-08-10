
const User = require("../../Models/users");

const registerUser = async (req, res) => {
    const { email, password, role, name } = req.body;
  
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
    // Filter out users with the 'admin' role
    const users = await User.find({ role: { $ne: "admin" } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = { adminGetUsers,registerUser };
