const express = require("express");
const router = express.Router();
const { saveCart } = require("../controllers/CartController");

router.post("/checkout", saveCart);

module.exports = router;
