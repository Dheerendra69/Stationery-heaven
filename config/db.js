const mongoose = require("mongoose");
const URL = process.env.DATABASE_URI;
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
