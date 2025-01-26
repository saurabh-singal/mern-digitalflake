import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      console.log(response.data.accessToken);

      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-blue-300">
        <div className="text-center">
          <img
            src="/asset/DigitalFlake_img.png"
            alt="Logo"
            className="mx-auto w-12 mb-2"
          />
          <h1 className="text-2xl font-semibold text-purple-700">
            digitalflake
          </h1>
          <p className="text-gray-500 text-sm">Welcome to Digitalflake admin</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-600 text-sm">Email-id</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mt-4 relative">
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="text-right mt-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevents page reload
                setShowForgotPassword(true);
              }}
              className="text-purple-600 text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg mt-4 hover:bg-purple-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;
