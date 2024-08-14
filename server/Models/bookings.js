const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateHistorySchema = new mongoose.Schema(
  {
    state: {
      type: String,
      enum: [
        "New leads",
        "Attempt to contacted (1)",
        "Attempt to contacted (2)",
        "Connected",
        "Prospect",
        "Hot leads",
        "Payment Received",
        "Not Interested",
      ],
    },
    comment: {
      type: String,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const fileSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const filesSchema = new mongoose.Schema(
  {
    documents: [fileSchema],
    receipts: [fileSchema],
  },
  {
    _id: false,
  }
);

const bookingSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    selectedClass: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
    },
    doc: {
      type: Date,
      required: true,
    },
    state: {
      type: String,
      enum: [
        "New leads",
        "Attempt to contacted (1)",
        "Attempt to contacted (2)",
        "Connected",
        "Prospect",
        "Hot leads",
        "Payment Received",
        "Not Interested",
      ],
      default: "New leads",
    },
    stateHistory: [stateHistorySchema],
    assignedEmployee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    files: filesSchema,
    approvedBYHigher: {
      type: Boolean,
      default: true,
    },
    allocationDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
