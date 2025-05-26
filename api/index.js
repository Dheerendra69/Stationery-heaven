require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

// connecting mongoDB
const connectDB = require("../config/db.js");
connectDB();

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting views engine
app.set("view engine", "hbs");
app.set("views", publicPath);

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/detail", (req, res) => {
  res.render("detail");
});

app.get("/orderPlaced", (req, res) => {
  res.render("orderPlaced");
});

app.get("/placeOrder", (req, res) => {
  res.render("placeOrder");
});

// Route related to form element
app.post("/checkout", async (req, res) => {
  res.render("orderPlaced");
  //   try {
  //     const { dataField } = req.body;
  //     const items = JSON.parse(dataField); // Parse the JSON string to extract the items array
  //     console.log(items);

  //     userOrder = items;
  //     console.log("Your order is: ");
  //     console.log(userOrder);
  //     // sendEmail1();

  //     // Save the order with the extracted items
  //     const order = new Order({ items });
  //     await order.save();

  //     // Send a response to the client
  //     res.redirect("orderPlaced");
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
});

// ---------

// placeOrder page - WORKING

// Server-side JavaScript (Node.js with Express and MongoDB)

// MongoDB setup
const Order = mongoose.model("Order", {
  orderId: String,
  customerName: String,
  orderDate: Date,
  gmail: String,
  items: Array,
  shop: String,
});

// Endpoint to save order
app.post("/saveOrder", (req, res) => {
  const orderData = req.body;

  // Create new order document
  const newOrder = new Order({
    orderId: orderData.orderId,
    customerName: orderData.customerName,
    orderDate: orderData.orderDate,
    gmail: orderData.gmail,
    items: orderData.items, // Assuming items are collected elsewhere
    shop: orderData.shop,
  });
  // Save order to MongoDB
  newOrder
    .save()
    .then(() => {
      res.status(302); // Redirect to orderPlaced.html with status code 302 (Temporary Redirect)
    })
    .catch((error) => {
      console.error("Error saving order:", error);
      res.sendStatus(500); // Send error response
    });
});

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    // You may want to add more validation for password strength
  },
});

// const collection= new mongoose.model("users", LoginSchema);
const collection = new mongoose.model("users", loginSchema);


// Route to handle forgot password request
app.post("/forgotpassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const temp = await collection.find();
    console.log(temp);

    const user = await collection.find({ email }).limit(1);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/setNewPassword", (req, res) => {
  res.render("setNewPassword");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email, // Hash the password before storing
  };
  userName = req.body.name;
  userEmail = req.body.email;
  console.log(userName + " " + userEmail);

  console.log(data["name"]);
  console.log(data["password"]);
  console.log(data["email"]);

  try {
    const existingUser = await collection.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).send("User already exists"); // Use a specific status code for conflicts
      return;
    }

    await collection.insertMany(data); // Use insertOne instead of insertMany for single documents
    res.status(201).render("index", { naming: req.body.name });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal server error"); // More informative error message
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    userName = check.name;
    userEmail = check.email;
    console.log(userName + " " + userEmail);
    if (check.password === req.body.password) {
      res.status(201).render("index", { naming: `${req.body.name}` });
    } else {
      res.send("incorrect password");
    }
  } catch (e) {
    console.log(e);

    res.send("wrong details");
  }
});

app.get("*", (req, res) => {
  res.status(404).render("error");
});

app.listen(3000, () => {
  console.log("App running on port number 3000");
});
