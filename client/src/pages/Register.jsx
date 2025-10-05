import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearError, clearMessage } from "../features/auth/authSlice";
import { authApi } from "../features/auth/authSlice";
import { notify } from "../utils/message";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      notify.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(authApi.registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })).unwrap();
      
      notify.success("Registration successful! Please check your email to verify your account.");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Create Account</h1>
          <p className="text-blue-600 text-sm">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInput}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-blue-50"
            />
            
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-blue-50"
            />
            
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-blue-50"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg placeholder-blue-400 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-blue-50"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center pt-2">
            <p className="text-blue-700 text-sm">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="font-semibold text-blue-600 hover:text-blue-800 underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;