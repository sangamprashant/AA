const Razorpay = require("razorpay");
const config = require("../config");
const Payment = require("../Models/payment");
const crypto = require("crypto");

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
    const { payment_id } = req.params;
    const pay = await instance.payments.fetch(payment_id);

    if (!pay) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found!" });
    }

    let payment = await Payment.findOneAndUpdate(
      { razorpayPaymentId: pay.id },
      {
        status: pay.captured ? "success" : "pending",
      },
      { new: true }
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

    res.json({ success: true, payment_: pay, paymentdb: payment });
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred",
      success: false,
      error: error,
    });
  }
};

const viewPaymentAccType = async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};
    if (type !== "razorpay") {
      if (type !== "all") {
        query.status = type;
      }
      const payments = await Payment.find(query);
      return res.json({ success: true, payments });
    }
    const payments = await instance.payments.all();
    res.json({ success: true, payments:payments.items });
  } catch (error) {
    res.status(500).json({ message: "Some error occurred", success: false, error });
  }
};


module.exports = {
  userMakePayment,
  userVerifyPayment,
  viewOnePayment,
  viewPaymentAccType,
};
