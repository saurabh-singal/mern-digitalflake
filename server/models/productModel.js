const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  image: { type: String, required: true },
});

module.exports = mongoose.model("product", productSchema);
