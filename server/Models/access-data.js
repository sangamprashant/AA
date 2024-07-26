const mongoose = require("mongoose");

const AccessDataSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    attempts: {
      count: {
        type: Number,
        default: 0,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    reached: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AccessData = mongoose.model("AccessData", AccessDataSchema);

module.exports = AccessData;
