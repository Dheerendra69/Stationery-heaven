const express = require("express");
const {
  loginController,
  signupController,
  forgotPasswordController,
} = require("../controllers/UserController");
const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/register", signupController);
router.post("/forgot-password", forgotPasswordController);
module.exports = router;
