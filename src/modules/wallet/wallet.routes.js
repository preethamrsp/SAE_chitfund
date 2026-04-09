const express = require("express");
const router = express.Router();
const wallet = require("./wallet.controller");
const auth = require("../../middlewares/auth.middleware");

router.get("/", auth, wallet.getWallet);
router.get("/transactions", auth, wallet.getTransactions);

module.exports = router;