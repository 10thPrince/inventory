import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-slate-800">
          Inventory Manager
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link className="text-slate-700 hover:text-indigo-600" to="/products/new">
            New Product
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-slate-800 text-white px-3 py-1.5 rounded-md hover:bg-slate-900 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

