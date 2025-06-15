const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  orderDate: Date,
  gmail: String,
  items: Array,
  shop: String,
});

const Order = new mongoose.model("order", OrderSchema);

module.exports = Order;
