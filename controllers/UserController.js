const UserDB = require("../models/User.js");
const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    const check = await UserDB.findOne({ name: name });
    if (check && check.password == password) {
      res.status(201).render("index", { naming: `${name}` });
    } else {
      res.send("Incorrect password");
    }
  } catch (e) {
    console.log("Error occurred while login : " + e);
  }
};

const signupController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const user = await UserDB.findOne({ email: email });
    if (user) {
      res.status(409).send("User already exists");
      return;
    }
    const data = {
      name: name,
      password: password,
      email: email,
    };
    await UserDB.insertOne(data);
    res.status(201).render("index", { naming: name });
  } catch (e) {
    console.log("Error occurred while signup: " + e);
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
