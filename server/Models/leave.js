const mongoose = require("mongoose");
const User = require("./users");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

// Set default timezone to IST
const indianTimeZone = "Asia/Kolkata";

const leaveRequestSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
      set: (date) => moment.tz(date, indianTimeZone).toDate(), // Convert to IST before saving
    },
    endDate: {
      type: Date,
      required: true,
      set: (date) => moment.tz(date, indianTimeZone).toDate(), // Convert to IST before saving
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    type: { type: String, required: true },
    requester: { type: Schema.Types.ObjectId, ref: "User" },
    approver: { type: Schema.Types.ObjectId, ref: "User" },
    approverRole: { type: String, enum: ["manager", "admin"] },
  },
  { timestamps: true }
);

leaveRequestSchema.methods.approveManager = async function (approved, approverId) {
  if (this.status !== "pending") throw new Error("Leave already processed.");

  this.status = approved ? "approved" : "rejected";
  this.approver = approverId;

  await this.save();

  const user = await User.findById(this.requester);
  const message = `Your leave request from ${moment
    .tz(this.startDate, indianTimeZone)
    .format("YYYY-MM-DD")} to ${moment
    .tz(this.endDate, indianTimeZone)
    .format("YYYY-MM-DD")} was ${this.status}.`;

  if (!user) return;

  await user.addNotification(message);

  if (approved) {
    const daysToLeave = [];

    for (
      let date = moment.tz(this.startDate, indianTimeZone);
      date <= moment.tz(this.endDate, indianTimeZone);
      date.add(1, "day")
    ) {
      daysToLeave.push(date.clone().toDate());
    }

    daysToLeave.forEach((date) => {
      user.attendanceRecords.push({
        date: moment.tz(date, indianTimeZone).toDate(),
        status: this.type, // or "approved-leave"
        details: `Leave: ${this.reason}`,
      });
    });

    await user.save();
  }
};

const Leave = mongoose.model("Leave", leaveRequestSchema);

module.exports = Leave;
