const express = require("express");
const router = express.Router();
const chit = require("./chit.controller");
const auth = require("../../middlewares/auth.middleware");
const memberController = require("./chit.member.controller");
const installmentController = require("./installment.controller");

// Generate installments
router.post("/installments/generate", auth, installmentController.generateInstallments);

// Get installments
router.get("/installments/:chitId", auth, installmentController.getInstallments);

// Add member
router.post("/add-member", auth, memberController.addMember);
// Protected route
router.post("/", auth, chit.createChit);

module.exports = router;

