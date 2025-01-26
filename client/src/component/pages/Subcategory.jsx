import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../../redux/features/productsSlice";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Subcategory = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    setProductToDelete(id); // Store the product ID to be deleted
    setIsModalOpen(true);
  };
  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete)); // Dispatch the delete action
    }
    setIsModalOpen(false); // Close the modal
    setProductToDelete(null); // Reset the product ID
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
    setProductToDelete(null); // Reset the product ID
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{error}</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">SubCategory</h1>
        <Link to="/dashboard/add-product">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800">
            Add New
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4 bg-gray-100 px-4 py-2 rounded">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-2 border">Id</th>
              <th className="px-4 py-2 border">Subcategory</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border break-words">{101 + i}</td>
                <td className="px-4 py-2 border break-words">
                  {product.subcategory}
                </td>
                <td className="px-4 py-2 border break-words">
                  {product.category}
                </td>
                <td className="px-4 py-2 border">
                  <img
                    src={`http://localhost:5000/Images/${product.image}`}
                    alt={product.name}
                    className="h-10 mx-auto"
                  />
                </td>
                <td
                  className={`px-4 py-2 border font-medium break-words ${
                    product.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.status}
                </td>
                <td className="px-4 py-2 border flex justify-center gap-2">
                  <Link to={`/dashboard/edit-product/${product._id}`}>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default Subcategory;
