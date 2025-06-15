const express = require("express");
const { saveOrder } = require("../controllers/OrderController.js");
const router = express.Router();

router.post("/saveOrder", saveOrder);

module.exports = router;
