const Razorpay = require("razorpay");
const Payment = require("../../Models/payment");
const crypto = require("crypto");
const Contact = require("../../Models/contact");
const Booking = require("../../Models/bookings");
const Visitor = require("../../Models/visitor");
const config = require("../../config");

const instance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_SECRET_KEY,
});

const viewPaymentAccType = async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};
    if (type !== "razorpay") {
      if (type !== "all") {
        query.status = type;
      }
      const payments = await Payment.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, payments });
    }
    const payments = await instance.payments.all();
    const sortedPayments = payments.items.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    res.json({ success: true, payments: sortedPayments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error occurred", success: false, error });
  }
};

module.exports = {
  viewPaymentAccType,
};
