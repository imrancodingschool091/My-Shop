import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, clearMessage } from "../features/auth/authSlice";
import { authApi } from "../features/auth/authSlice";
import { notify } from "../utils/message";

function ResendVerification() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(authApi.resendVerification(email)).unwrap();
      setEmail("");
      notify.success("Verification email sent successfully!");
    } catch (error) {
      console.log("Resend failed:", error);
    }
  };

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      notify.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Resend Verification Email</h1>
          <p className="text-blue-600 text-sm mt-2">
            Enter your email address to receive a new verification link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? "Sending..." : "Resend Verification Email"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-blue-100">
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResendVerification;