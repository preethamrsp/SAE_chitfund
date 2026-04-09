const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./modules/auth/auth.routes"));
app.use("/chits", require("./modules/chits/chit.routes"));
app.use("/payments", require("./modules/payments/payment.routes"));
app.use("/auction", require("./modules/auction/auction.routes"));
app.use("/wallet", require("./modules/wallet/wallet.routes"));

module.exports = app;