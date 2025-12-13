const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    shop: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "card", "upi"],
      default: "cod",
    },
    items: {
      type: [ItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items && items.length > 0;
        },
        message: "Order must have at least one item",
      },
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

// Create indexes for better query performance
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ email: 1 });
OrderSchema.index({ orderDate: -1 });

// Virtual for total quantity
OrderSchema.virtual("totalQuantity").get(function () {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Virtual for total items count
OrderSchema.virtual("totalItems").get(function () {
  return this.items.length;
});

// Ensure virtuals are included when converting to JSON
OrderSchema.set("toJSON", { virtuals: true });
OrderSchema.set("toObject", { virtuals: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
