import { useState } from "react";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      // alert(data.status)
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center text-purple-700">
          Did you forget password?
        </h2>
        <p className="text-center text-gray-600 text-sm mb-4">
          Enter your email address and we’ll send you a link to restore password
        </p>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 mt-4 rounded-md hover:bg-purple-800"
          >
            Request reset link
          </button>
        </form>
        <button
          onClick={onClose}
          className="block text-center text-gray-500 text-sm mt-4 hover:underline"
        >
          Back to log in
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
