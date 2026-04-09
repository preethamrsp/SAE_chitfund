const express = require("express");
const router = express.Router();
const payment = require("./payment.controller");
const auth = require("../../middlewares/auth.middleware");

// Pay installment
router.post("/pay", auth, payment.payInstallment);

// Get my payments
router.get("/my", auth, payment.getMyPayments);

module.exports = router;