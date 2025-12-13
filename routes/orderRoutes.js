const express = require("express");
const { saveOrder, getAllOrders, getOrderById } = require("../controllers/OrderController.js");
const router = express.Router();

router.post("/save-order", saveOrder);

router.get("/orders", getAllOrders);

router.get("/order/:orderId", getOrderById);

module.exports = router;
