const express = require("express");
const router = express.Router();
const auction = require("./auction.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/bid", auth, auction.placeBid);
router.post("/declare", auth, auction.declareWinner);
router.get("/bids/:installmentId", auth, auction.getBids);

module.exports = router;