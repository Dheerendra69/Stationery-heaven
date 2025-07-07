const OrderDB = require("../models/Order");

const saveOrder = async (req, res) => {
  try {
    const { orderId, customerName, orderDate, gmail, items, shop } = req.body;

    const newOrder = new OrderDB({
      orderId,
      customerName,
      orderDate,
      gmail,
      items,
      shop,
    });

    await newOrder.save();

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Error saving order" });
  }
};

module.exports = { saveOrder };
