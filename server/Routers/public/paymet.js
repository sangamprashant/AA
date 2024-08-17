const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middlewares/authMiddleware");
const {
  userMakePayment,
  userVerifyPayment,
  viewOnePayment,
  dashboardContent,
  dashboardPayments,
} = require("../../Controllers/public/payment");

// create a payment
router.post("/make", userMakePayment);
// check payment
router.post("/success", userVerifyPayment);
// view the payment
router.post("/view-one", viewOnePayment);

// -----------------Admin------------
router.get("/dashboard", authenticateToken, dashboardContent);
// view-payment-fron razorpay
router.get("/dashboard/payments", authenticateToken, dashboardPayments);



module.exports = router;
