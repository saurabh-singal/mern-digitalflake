const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

const createProducts = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { productName, category, subCategory, status } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!productName || !category || !subCategory || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await Product.create({
    productName,
    subcategory: subCategory,
    category,
    status,
    image,
  });
  res.status(201).json(product);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productName, category, subcategory, status } = req.body;
  const image = req.file ? req.file.filename : null;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName,
      category,
      subcategory,
      status,
      image: image || undefined,
    },
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json(product);
});

module.exports = {
  getProducts,
  createProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
