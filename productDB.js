require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const ProductJson = require("./product.json");
// One of the most important thing you have to remember is that aapko json file ko export nhi karna padta hai bro

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

start();
