import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authApi";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart); // ✅ cart state
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  // ✅ Common links
  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  const cartCount = cartItems?.length || 0;

  return (
    <nav className="bg-blue-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:text-blue-200 transition"
          >
            <ShoppingBag className="w-6 h-6" />
            <span>MyShop</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium hover:text-blue-200 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* ✅ Cart with item count */}
            <Link
              to="/cart"
              className="relative flex items-center font-medium hover:text-blue-200 transition"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="font-medium hover:text-blue-200 transition"
                >
                  {user?.name || "Profile"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-800 px-4 py-1 rounded-md font-medium hover:bg-blue-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-white px-4 py-1 rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-900 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {commonLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 font-medium hover:text-blue-200 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* ✅ Cart with count (mobile) */}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="block py-2 font-medium hover:text-blue-200 transition flex items-center gap-2"
          >
            <div className="relative flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block py-2 font-medium hover:text-blue-200 transition"
              >
                {user?.name || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-white text-blue-800 text-center rounded-md font-medium py-2 hover:bg-blue-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block border border-white text-center rounded-md font-medium py-2 hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
