require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const port = process.env.PORT || 5000;

const products_routes = require("./routes/products");
app.get("/", (req, res) => {
  res.send("Hello Iam live here");
});

// Middleware  or to set routers
app.use("/api/products", products_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Yes we are live on port number${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
