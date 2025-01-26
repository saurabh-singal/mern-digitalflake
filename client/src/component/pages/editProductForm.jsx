// src/components/ProductEditForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  updateProduct,
} from "../../redux/features/productsSlice";

const EditProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL
  const product = useSelector((state) =>
    state.products.products.find((p) => p._id === id)
  );

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null); // State for the image file
  const [imagePreview, setImagePreview] = useState(null); // State for preview image

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setCategory(product.category);
      setSubCategory(product.subcategory);
      setStatus(product.status);
      setImagePreview(
        product.image ? `http://localhost:5000/Images/${product.image}` : null
      );
    } else {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview image before submission
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || !category || !subcategory || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("_id", id);
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("status", status);

    if (image) {
      formData.append("image", image); // Append the image if a new one is selected
    }

    dispatch(updateProduct(formData));
    navigate("/dashboard/products"); // Redirect to the products list page after successful update
  };

  if (!product) {
    return <div>Loading...</div>; // Show loading state while the product is being fetched
  }

  return (
    <div className="ml-64 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          {/* Product Name */}
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="flex-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sub-Category */}
          <div className="flex-1">
            <label
              htmlFor="subCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Sub-Category
            </label>
            <input
              id="subCategory"
              type="text"
              value={subcategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          {/* Show image preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product"
              className="mt-4 w-32 h-32 object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
