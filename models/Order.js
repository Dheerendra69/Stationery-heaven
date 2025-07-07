const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  orderDate: { type: Date, required: true },
  gmail: { type: String, required: true },
  items: [ItemSchema],
  shop: { type: String, required: true },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
