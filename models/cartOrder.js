const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
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
