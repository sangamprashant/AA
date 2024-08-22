const express = require("express");
const { viewPaymentAccType, viewOnePayment, viewInRange, currentMonthPayments } = require("../../Controllers/admin/payment");
const router = express.Router();

router.get("/view/:type", viewPaymentAccType);
router.post("/view-one", viewOnePayment);
router.get("/range", viewInRange);
router.get("/current-month", currentMonthPayments);

module.exports = router;
