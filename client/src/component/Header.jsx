import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import LogoutPopup from "./pages/LogoutPopup";

export default function Header() {
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);

  return (
    <header className="bg-purple-700 h-16 flex items-center justify-between px-6 shadow-md">
      <div className="h-10 w-64 py-2">
        <img src="/asset/DigitalFlake_logo.png" alt="logo" />
      </div>
      <button
        onClick={() => setLogoutPopupOpen(true)}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded"
      >
        <FaSignOutAlt />
        Logout
      </button>

      {/* Logout Confirmation Popup */}
      <LogoutPopup
        isOpen={isLogoutPopupOpen}
        onClose={() => setLogoutPopupOpen(false)}
        onConfirm={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      />
    </header>
  );
}
