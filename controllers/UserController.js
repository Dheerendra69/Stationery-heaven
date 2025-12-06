const UserDB = require("../models/User.js");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;

    const query = name.includes("@")
      ? { email: name }
      : { name };

    const user = await UserDB.findOne(query);

    if (!user || user.password !== password) {
      return res.status(401).send("Username or Password is Incorrect");
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    console.error("Error occurred while login:", e);
    res.status(500).send("Internal server error");
  }
};

const signupController = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const existingUser = await UserDB.findOne({ email });
    if (existingUser) return res.status(409).send("User already exists");

    const newUser = { name, password, email };
    const result = await UserDB.insertOne(newUser);

    const token = jwt.sign({ id: result.insertedId, name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Signup successful", token, name });
  } catch (e) {
    console.error("Error occurred while signup:", e);
    res.status(500).send("Internal server error");
  }
};

const forgotPasswordController = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await UserDB.find({ email }).limit(1);

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
};

module.exports = {
  loginController,
  signupController,
  forgotPasswordController,
};
