const express = require("express");
const router = express.Router();
const { saveCart } = require("../controllers/CartController");

router.post("/check-out", saveCart);

module.exports = router;
