const express = require("express");
const { saveOrder } = require("../controllers/OrderController.js");
const router = express.Router();

router.post("/save-order", saveOrder);

module.exports = router;
