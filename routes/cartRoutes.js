const express = require("express");
const router = express.Router();
const { saveCart } = require("../controllers/CartController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/check-out", authMiddleware, saveCart);

module.exports = router;
