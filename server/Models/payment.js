const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    purpose: { type: String, required: true },
    amount: { type: String, required: true },
    selectClass: { type: String, required: true },
    orderCreationId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },
    status: {
      type: String,
      enum: ["created", "success", "pending"],
      default: "created",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
