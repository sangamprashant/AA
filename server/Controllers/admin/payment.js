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
const viewOnePayment = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    if (!payment_id && !order_id) {
      return res.status(400).json({
        success: false,
        message: "payment_id or order_id is required!",
      });
    }

    // Handle payment_id case
    if (payment_id) {
      const pay = await instance.payments.fetch(payment_id);

      if (!pay) {
        return res
          .status(404)
          .json({ success: false, message: "Payment not found!" });
      }

      // Update or create payment record
      let payment = await Payment.findOneAndUpdate(
        { razorpayPaymentId: pay.id },
        {
          status: pay.captured ? "success" : "pending",
        },
        { new: true } // Return the updated document
      );

      if (!payment) {
        payment = new Payment({
          name: pay.notes.name,
          mobileNumber: pay.notes.mobileNumber,
          email: pay.notes.email,
          purpose: pay.notes.purpose,
          amount: (pay.amount / 100).toString(),
          selectClass: pay.notes.class,
          orderCreationId: pay.order_id,
          razorpayOrderId: pay.order_id,
          razorpayPaymentId: pay.id,
          razorpaySignature: pay.signature || "No signature",
          status: pay.captured ? "success" : "pending",
        });

        await payment.save();
      }

      return res.json({ success: true, payment_: pay, paymentdb: payment });
    }

    // Handle order_id case
    if (order_id) {
      const payment = await Payment.findOne({ orderCreationId: order_id });

      if (!payment) {
        return res
          .status(404)
          .json({ success: false, message: "Payment not found!" });
      }

      return res.json({ success: true, paymentdb: payment });
    }
  } catch (error) {
    console.error("Error occurred while fetching payment:", error);
    return res.status(500).json({
      message: "Some error occurred",
      success: false,
      error: error.message,
    });
  }
};

const viewInRange = async (req, res) => {
  try {
    const { startDate, endDate, category, categoryValue } = req.query;

    // Build the query object
    let query = {};

    // Date range filter
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Category filter (e.g., status, selectClass, etc.)
    if (category && categoryValue) {
      query[category] = categoryValue;
    }

    const payments = await Payment.find(query);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};

// Helper function to get the current month's start and end dates
const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
  return { start, end };
};

// Route to get payments for the current month
const currentMonthPayments = async (req, res) => {
  try {
    const { start, end } = getCurrentMonthRange();
    const payments = await Payment.find({
      createdAt: { $gte: start, $lte: end },
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  viewPaymentAccType,
  viewOnePayment,
  viewInRange,
  currentMonthPayments,
};
