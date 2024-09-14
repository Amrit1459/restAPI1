const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  // Build query object based on the filters
  if (company) {
    queryObject.company = company;
    console.log(queryObject.company);
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    console.log(queryObject.name);
  }

  if (featured) {
    queryObject.featured = featured;
    console.log(queryObject.featured);
  }

  // Start building the query
  let apiData = Product.find(queryObject);

  // Handle sorting
  if (sort) {
    let sortfix = sort.split(",").join(" "); // Replace comma with space for MongoDB sorting
    apiData = apiData.sort(sortfix);
  }

  // Handle field selection
  if (select) {
    let selectFix = select.split(",").join(" "); // Replace comma with space for field selection
    apiData = apiData.select(selectFix);
  }

  // Pagination logic
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit;

  // Apply pagination before executing the query
  apiData = apiData.skip(skip).limit(limit);

  // Execute the query and get the paginated data
  const Products = await apiData;

  // Count total number of hits without pagination (optional)
  const totalHits = await Product.countDocuments(queryObject);

  // Send the response with paginated results and number of total hits
  res.status(200).json({ Products, nbHits: Products.length, totalHits });
};

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query).select("name company");
  res.status(200).json({ myData });
};

module.exports = {
  getAllProducts,
  getAllProductsTesting,
};
