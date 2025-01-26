import React from "react";
import { FaExclamationCircle } from "react-icons/fa"; // Alert icon

export default function LogoutPopup({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="flex flex-col items-center">
          <FaExclamationCircle className="text-red-500 text-4xl" />
          <h2 className="text-xl font-semibold mt-4">Are you sure?</h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Do you really want to logout? This action cannot be undone.
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
