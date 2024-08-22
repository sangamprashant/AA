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
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
};

const markOneSeen = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { index } = req.query;

    await user.markNotificationAsSeen(index);

    res
      .status(200)
      .json({ message: "Notification marked as seen.", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to mark notification as seen.", success: false });
  }
};

const markAllSeen = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user.id, "notifications.seen": false }, // Only update unseen notifications
      { $set: { "notifications.$[].seen": true } } // Set all notifications as seen
    );

    res
      .status(200)
      .json({ message: "All notifications marked as seen.", success: true });
  } catch (error) {
    console.error("Error marking all notifications as seen:", error);
    res
      .status(500)
      .json({
        error: "Failed to mark all notifications as seen.",
        success: false,
      });
  }
};

const clearAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found", success: false });
    }

    // Clear all notifications
    user.notifications = [];
    await user.save();

    res.status(200).json({ message: "All notifications cleared.", success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear notifications.", success: false });
  }
};

module.exports = {
  userGetsTheirNotificationsAndUnSeenCount,
  markOneSeen,clearAllNotifications,
  markAllSeen,
};
