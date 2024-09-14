const mongoose = require("mongoose");
require("dotenv").config()
// Ensure the URI is correctly formatted with no line breaks

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = connectDB;
