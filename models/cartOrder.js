const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
});

const CartOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  gmail: { type: String, required: true },
  orderDate: { type: Date, required: true },
  shop: { type: String, required: true },
  items: [CartItemSchema], 
});

const CartOrder = mongoose.model("cartOrder", CartOrderSchema);

module.exports = CartOrder;
