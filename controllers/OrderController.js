const GuestOrderDB = require("../models/guestOrder");

const saveOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      deliveryDate,
      shop,
      paymentMethod,
      items,
      orderDate,
    } = req.body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !deliveryDate ||
      !shop ||
      !paymentMethod ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required and order must have at least one item",
      });
    }

    const totalOrders = await GuestOrderDB.countDocuments();

    const orderId = `ORD${totalOrders + 1}`;

    const newOrder = new GuestOrderDB({
      orderId,
      customerName,
      email,
      phone,
      address,
      orderDate: orderDate || new Date(),
      deliveryDate: new Date(deliveryDate),
      shop,
      paymentMethod,
      items,
      status: "pending",
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        orderId: savedOrder.orderId,
        customerName: savedOrder.customerName,
        totalItems: savedOrder.totalItems,
        totalQuantity: savedOrder.totalQuantity,
      },
    });
  } catch (error) {
    console.error("Error saving order:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await GuestOrderDB.find().sort({ orderDate: -1 }).limit(100);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await GuestOrderDB.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

module.exports = { saveOrder, getAllOrders, getOrderById };
