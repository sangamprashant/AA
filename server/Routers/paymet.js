const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const {
  userMakePayment,
  userVerifyPayment,
  viewOnePayment,
  viewPaymentAccType,
} = require("../Controllers/payment");

// create a payment
router.post("/make", userMakePayment);
// check payment
router.post("/success", userVerifyPayment);
// view the payment
router.get("/view-one/:payment_id", viewOnePayment);

// -----------------Admin------------
// view the payment acc to the type
router.get("/view/:type", authenticateToken, viewPaymentAccType);

// router.get("/payments", async (req, res) => {
//   try {
//     const pay = await instance.payments.fetch("pay_Oa55R1KG3pQGuz");
//     const payments = await instance.payments.all();

//     const payload = {

//       amount: 10 * 100,
//       currency: "INR",
//       description: "trail  links",
//       notify: {
//         sms: true,
//         email: true,
//       },
//     };
//     const link = await instance.paymentLink.create(payload);
//     res.json(pay);
//   } catch (error) {
//     res.status(500).send("Failed to fetch payments from Razorpay");
//   }
// });

module.exports = router;
