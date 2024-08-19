const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const notificationSchema = new Schema(
  {
    message: { type: String, required: true },
    seen: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const attendanceSchema = new Schema(
  {
    date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: [
        "early",
        "present",
        "absent",
        "late",
        "half-day-leave",
        "off",
        "holiday",
        "training",
        "remote-work",
        "meeting",
        "unpaid-leave",
      ],
    },
    details: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, default: "Not Set" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee", "manager"],
    },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    notifications: [notificationSchema],
    attendanceRecords: [attendanceSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to add a new notification
userSchema.methods.addNotification = function (message) {
  this.notifications.push({ message });
  return this.save();
};

// Method to mark notifications as seen
userSchema.methods.markNotificationsAsSeen = function () {
  this.notifications.forEach((notification) => (notification.seen = true));
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
