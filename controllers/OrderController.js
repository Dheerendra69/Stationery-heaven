const OrderDB = require("../models/Order");

const saveOrder = async (req, res) => {
  const orderData = req.body;
  const newOrder = new OrderDB({
    orderId: orderData.orderId,
    customerName: orderData.customerName,
    orderDate: orderData.orderDate,
    gmail: orderData.gmail,
    items: orderData.items,
    shop: orderData.shop,
  });
  newOrder
    .save()
    .then(() => {
      res.status(302).send("orderPlaced");
    })
    .catch((error) => {
      res.sendStatus(500).json("Error saving order" + error);
    });
};

module.exports = { saveOrder };
