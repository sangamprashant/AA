const User = require("../../Models/users");

const userGetsTheirNotificationsAndUnSeenCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const notifications = user.notifications;

    const unseenCount = notifications.filter(
      (notification) => !notification.seen
    ).length;

    res.json({
      notifications,
      unseenCount,
      success:true
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

module.exports = {
  userGetsTheirNotificationsAndUnSeenCount,
};
