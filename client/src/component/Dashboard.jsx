import { useState } from "react";
import Header from "./Header";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Subcategory from "./pages/Subcategory";
import Sidebar from "./Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AddProductForm from "./pages/addProductForm";
import EditProductForm from "./pages/editProductForm";

const Dashboard = () => {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
  };
  return (
    // <div className="flex h-screen flex-col md:flex-row">
    //   <Sidebar />
    //   <div className="flex-1 flex flex-col">
    //     <Header />
    //     <div className="p-4 overflow-auto">
    //     <Routes>
    //       <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    //       <Route path="category" element={<PrivateRoute><Category /></PrivateRoute>} />
    //       <Route path="subcategory" element={<PrivateRoute><Subcategory /></PrivateRoute>} />
    //       <Route path="products" element={<PrivateRoute><Product /></PrivateRoute>} />
    //       <Route path="add-product" element={<PrivateRoute><AddProductForm /></PrivateRoute>} />
    //       <Route path="edit-product/:id" element={<PrivateRoute><EditProductForm /></PrivateRoute>} />
    //     </Routes>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-50 p-4 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="category"
              element={
                <PrivateRoute>
                  <Category />
                </PrivateRoute>
              }
            />
            <Route
              path="subcategory"
              element={
                <PrivateRoute>
                  <Subcategory />
                </PrivateRoute>
              }
            />
            <Route
              path="products"
              element={
                <PrivateRoute>
                  <Product />
                </PrivateRoute>
              }
            />
            <Route
              path="add-product"
              element={
                <PrivateRoute>
                  <AddProductForm />
                </PrivateRoute>
              }
            />
            <Route
              path="edit-product/:id"
              element={
                <PrivateRoute>
                  <EditProductForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
