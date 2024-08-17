const express = require("express");
const { viewPaymentAccType } = require("../../Controllers/admin/payment");
const router = express.Router();

router.get("/view/:type", viewPaymentAccType);

module.exports = router;
