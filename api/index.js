require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const userRoutes = require("../routes/userRoutes.js");
const orderRoutes = require("../routes/orderRoutes.js");
const cartRoutes = require("../routes/cartRoutes.js");
const mailRoutes = require("../routes/mailRoutes.js");
const allowedOrigins = require("../config/origins.js");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: [ allowedOrigins ], 
  credentials: true
}));

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

app.get("/success", (req, res) => {
  res.render("successMessage");
});

app.get("/guest-check-out", (req, res) => {
  res.render("guestCheckOut");
});

app.get("/set-new-password", (req, res) => {
  res.render("setNewPassword");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/products/lab-manual", (req, res) => {
  // res.render("labManual", {
  //   layout: "layouts/main",
  //   title: "Lab Manual Page",
  // });
  res.render("productsLabManual");
});

app.get("/products/bio-technology", (req, res) => {
  res.render("productsBiotech");
});

app.get("/products/mechanical", (req, res) => {
  res.render("productsMec");
});

app.get("/products/electrical", (req, res) => {
  res.render("productsElec");
});

app.get("/forgot-password", (req, res) => {
  res.render("forgotPassword");
});

app.post("/login", userRoutes);
app.post("/signup", userRoutes);
app.post("/register", userRoutes);
app.post("/forgot-password", userRoutes);
app.post("/save-order", orderRoutes);
app.post("/check-out", cartRoutes);
app.post("/send-mail", mailRoutes);

app.get("*", (req, res) => {
  res.status(404).render("error");
});

app.listen(PORT, () => {
  console.log("App running on port number 3000");
});
