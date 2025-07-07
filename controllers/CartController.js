const cartOrderDB = require("../models/cartOrder");

const saveCart = async (req, res) => {
  try {
    const { items, customerName, gmail, shop } = req.body;

    const newOrder = new cartOrderDB({
      orderId: "ORD" + Math.floor(Math.random() * 1000000),
      customerName,
      orderDate: new Date(),
      gmail,
      items,
      shop,
    });

    await newOrder.save();

    res.status(200).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};

module.exports = { saveCart };
