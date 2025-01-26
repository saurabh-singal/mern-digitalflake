// src/components/ConfirmDeleteModal.js
import React from "react";
import { MdWarning } from "react-icons/md"; // Import MdWarning icon from react-icons

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex items-center mb-4">
          <MdWarning className="h-6 w-6 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-700 ml-2">
            Are you sure you want to delete?
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone. Please confirm if you'd like to proceed
          with deleting this product.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
