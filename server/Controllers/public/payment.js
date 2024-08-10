const Razorpay = require("razorpay");
const config = require("../../config");
const Payment = require("../../Models/payment");
const crypto = require("crypto");
const Contact = require("../../Models/contact");
const Booking = require("../../Models/bookings");
const Visitor = require("../../Models/visitor");
const sendPaymentConfirmationEmail = require("../../Mail/paymentCreated");
const sendPaymentCompletionEmail = require("../../Mail/paymentCompletion");

const instance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_SECRET_KEY,
});

const userMakePayment = async (req, res) => {
  try {
    const { name, mobileNumber, email, purpose, amount, selectClass } =
      req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    if (!order)
      return res
        .status(500)
        .json({ message: "Some error occured", success: false });

    const newPayment = new Payment({
      name,
      mobileNumber,
      email,
      purpose,
      amount,
      selectClass,
      orderCreationId: order.id,
      status: "created",
    });

    await newPayment.save();
    sendPaymentConfirmationEmail(newPayment);

    res.status(200).json({
      message: "Payment created successfully",
      success: true,
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      success: false,
      error: error,
    });
  }
};

// handels call-back all check do not touch
const userVerifyPayment = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac("sha256", config.RAZORPAY_SECRET_KEY);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res
        .status(400)
        .json({ success: false, message: "Transaction not legit!" });

    const payment = await Payment.findOneAndUpdate(
      { orderCreationId },
      {
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        status: "success",
      },
      { new: true }
    );

    sendPaymentCompletionEmail(payment);

    if (payment) {
      res.json({ success: true, message: "Payment successful!" });
    } else {
      res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      success: false,
      error: error,
    });
  }
};

const viewOnePayment = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;

    // Check for required parameters
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

const viewPaymentAccType = async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};

    // If the type is not 'razorpay', set up the query based on type
    if (type !== "razorpay") {
      if (type !== "all") {
        query.status = type;
      }

      // Find payments and sort by most recent
      const payments = await Payment.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, payments });
    }

    // For Razorpay, get all payments and sort by most recent
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

const dashboardContent = async (req, res) => {
  try {
    const [
      totalVisitors,
      newVisitors,
      createdCount,
      successCount,
      pendingCount,
      paymentTotalCount,
      checkedTrueCount,
      checkedFalseCount,
      contactTotalCount,
      bookingCheckedCount,
      bookingUncheckedCount,
      bookingTotalCount,
    ] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.countDocuments({ isNewVisitor: true }),
      Payment.countDocuments({ status: "created" }),
      Payment.countDocuments({ status: "success" }),
      Payment.countDocuments({ status: "pending" }),
      Payment.countDocuments(),
      Contact.countDocuments({ checked: true }),
      Contact.countDocuments({ checked: false }),
      Contact.countDocuments(),
      Booking.countDocuments({ checked: true }),
      Booking.countDocuments({ checked: false }),
      Booking.countDocuments(),
    ]);

    res.json({
      success: true,
      visitorsCounts: {
        total: totalVisitors,
        new: newVisitors,
      },
      paymentCounts: {
        created: createdCount,
        success: successCount,
        pending: pendingCount,
        total: paymentTotalCount,
      },
      contactCounts: {
        checkedTrue: checkedTrueCount,
        checkedFalse: checkedFalseCount,
        total: contactTotalCount,
      },
      bookingCounts: {
        checked: bookingCheckedCount,
        unchecked: bookingUncheckedCount,
        total: bookingTotalCount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Some error occurred",
      success: false,
      error: error.message,
    });
  }
};

const dashboardPayments = async (req, res) => {
  try {
    const payments = await instance.payments.all();

    // Assuming `created_at` is the field to sort by
    const sortedPayments = payments.items.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    res.status(200).json({
      success: true,
      payments: sortedPayments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Some error occurred",
      success: false,
      error,
    });
  }
};

module.exports = {
  userMakePayment,
  userVerifyPayment,
  viewOnePayment,
  viewPaymentAccType,
  dashboardContent,
  dashboardPayments,
};
