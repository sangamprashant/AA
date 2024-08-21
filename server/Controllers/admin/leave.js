const User = require("../../Models/users");

const applyForLeave = async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    await user.applyForLeave(new Date(startDate), new Date(endDate), reason);
    res.status(200).json({
      message: "Leave request submitted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  applyForLeave,
};
