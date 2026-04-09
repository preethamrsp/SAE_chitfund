const authMiddleware = require("../../middlewares/auth.middleware");
const authController = require("./auth.controller");
const express = require("express");
const router = express.Router();
const auth = require("./auth.controller");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;