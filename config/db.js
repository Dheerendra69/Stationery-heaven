const mongoose = require("mongoose");
const URL = "mongodb+srv://Coura:coura123@cluster0.5j8hn.mongodb.net/";
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error occurred while connecting DB: " + error);
    process.exit(1);
  }
};
module.exports = connectDB;
