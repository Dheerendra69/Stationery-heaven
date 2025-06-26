require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const userRoutes = require("../routes/userRoutes.js");
const orderRoutes = require("../routes/orderRoutes");
const app = express();

// connecting mongoDB
const connectDB = require("../config/db.js");
connectDB();

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up handlebars with layout support

// app.engine(
//   "hbs",
//   exphbs.engine({
//     extname: "hbs",
//     layoutsDir: __dirname + "/public/layouts",
//     partialsDir: __dirname + "/public/partials",
//     // No defaultLayout
//   })
// );

// setting views engine
app.set("view engine", "hbs");
app.set("views", publicPath);

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

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/login", userRoutes);
app.post("/signup", userRoutes);
app.post("/forgotPassword", userRoutes);
app.post("/saveOrder", orderRoutes);

// Route to handle forgot password request
// app.post("/forgotpassword", async (req, res) => {
//   const { email, newPassword } = req.body;

//   try {
//     const temp = await collection.find();
//     console.log(temp);

//     const user = await collection.find({ email }).limit(1);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.password = newPassword;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.get("/setNewPassword", (req, res) => {
  res.render("setNewPassword");
});

// serving static files
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/productsBiotech", (req, res) => {
  res.render("productsBiotech");
});
app.get("/productsMec", (req, res) => {
  res.render("productsMec");
});
app.get("/productsElec", (req, res) => {
  res.render("productsElec");
});
app.get("/labManual", (req, res) => {
  res.render("labManual");
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
  });
});
app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword");
});
app.get("*", (req, res) => {
  res.status(404).render("error");
});

app.listen(3000, () => {
  console.log("App running on port number 3000");
});
