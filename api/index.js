require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const userRoutes = require("../routes/userRoutes.js");
const orderRoutes = require("../routes/orderRoutes.js");
const cartRoutes = require("../routes/cartRoutes.js");
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
hbs.registerPartials(path.join(__dirname, "..", "public/partials"));

// Cold start wake-up API
app.get("/api/wake-up", (req, res) => {
  res.status(200).send("Backend awake and running!");
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

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main",
    title: "About Us",
  });
  // res.render("about");
});
app.get("/home", (req, res) => {
  res.render("home", {
    layout: "layouts/main",
    title: "Stationary Heaven",
  });
  // res.render("home");
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

app.get("/setNewPassword", (req, res) => {
  res.render("setNewPassword");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/labManual", (req, res) => {
  // res.render("labManual", {
  //   layout: "layouts/main",
  //   title: "Lab Manual Page",
  // });
  res.render("labManual");
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

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword");
});

app.post("/login", userRoutes);
app.post("/signup", userRoutes);
app.post("/register", userRoutes);
app.post("/forgotPassword", userRoutes);
app.post("/saveOrder", orderRoutes);
app.post("/checkout", cartRoutes);

app.get("*", (req, res) => {
  res.status(404).render("error");
});

app.listen(3000, () => {
  console.log("App running on port number 3000");
});
