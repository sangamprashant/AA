const express = require("express");
const { viewPaymentAccType, viewOnePayment, viewInRange } = require("../../Controllers/admin/payment");
const router = express.Router();

router.get("/view/:type", viewPaymentAccType);
router.post("/view-one", viewOnePayment);
router.get("/range", viewInRange);

module.exports = router;
