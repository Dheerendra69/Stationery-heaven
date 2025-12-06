const cartOrderDB = require("../models/cartOrder");
const { sendEmail } = require("../utils/sendEmail");

const saveCart = async (req, res) => {
  try {
    const { items, shop } = req.body;
    const { name, email } = req.user;

    const newOrder = new cartOrderDB({
      orderId: "ORD" + Math.floor(Math.random() * 1000000),
      customerName: name,
      orderDate: new Date(),
      gmail: email,
      items,
      shop,
    });

    sendEmail(email, "Order Successful", "You have succesfully made an order.");

    sendEmail(process.env.ADMIN_EMAIL, "A new order has been made", "An order has been from the website.");

    await newOrder.save();

    res.status(200).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};

module.exports = { saveCart };
