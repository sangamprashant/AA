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

const activeTimeSchema = new Schema(
  {
    minutes: { type: Number, default: 0 },
    loginTime: { type: Date },
    logoutTime: { type: Date }, // Added logout time for tracking session duration
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
    activeTime: activeTimeSchema,
    details: { type: String, default: "" },
  },
  { _id: false }
);

const leaveRequestSchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    type: { type: String, required: true },
    approver: { type: Schema.Types.ObjectId, ref: "User" },
    approverRole: { type: String, enum: ["manager", "admin"] },
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: { type: String, default: "Not Set" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee", "manager", "teacher"],
    },
    manager: { type: Schema.Types.ObjectId, ref: "User" },
    notifications: [notificationSchema],
    attendanceRecords: [attendanceSchema],
    leaveRequests: [leaveRequestSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to add a notification
userSchema.methods.addNotification = function (message) {
  this.notifications.push({ message });
  return this.save();
};

// Method to mark notifications as seen
userSchema.methods.markNotificationsAsSeen = function () {
  this.notifications.forEach((notification) => (notification.seen = true));
  return this.save();
};

userSchema.methods.markNotificationAsSeen = function (index) {
  if (this.notifications[index]) {
    this.notifications[index].seen = true;
  }
  return this.save();
};

userSchema.methods.applyForLeave = async function (startDate, endDate, reason, type
) {
  let approverRole, approver, notificationMessage;

  if (this.role === "employee") {
    approverRole = "manager";
    approver = await User.findById(this.manager);
  } else if (["teacher", "manager"].includes(this.role)) {
    approverRole = "admin";
    approver = await User.findOne({ role: "admin" });
  }

  if (!approver) throw new Error("No approver found");

  notificationMessage = `${
    this.name
  } has applied for ${type} leave from ${startDate.toDateString()} to ${endDate.toDateString()}.`;

  this.leaveRequests.push({
    startDate,
    endDate,
    reason,
    type,
    approverRole,
    approver,
  });
  await this.save();
  await approver.addNotification(notificationMessage);
  return this;
};

userSchema.methods.approveLeave = async function (leaveRequestId, approved) {
  const leaveRequest = this.leaveRequests.id(leaveRequestId);
  if (!leaveRequest || leaveRequest.status !== "pending") {
    throw new Error("Leave request not found or already processed.");
  }
  leaveRequest.status = approved ? "approved" : "rejected";
  await this.addNotification(
    `Your leave request from ${leaveRequest.startDate.toDateString()} to ${leaveRequest.endDate.toDateString()} has been ${
      approved ? "approved" : "rejected"
    }.`
  );
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
