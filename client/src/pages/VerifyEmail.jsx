import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../features/auth/authSlice";
import { authApi } from "../features/auth/authSlice";

function VerifyEmail() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message } = useSelector((state) => state.auth);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  useEffect(() => {
    if (token && !verificationAttempted) {
      setVerificationAttempted(true);
      dispatch(authApi.verifyEmail(token));
    } else if (!token) {
      dispatch(clearError());
      dispatch(clearMessage());
    }
  }, [token, dispatch, verificationAttempted]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate('/login', { 
          state: { message: "Email verified successfully! You can now login." }
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  // Show loading only when verification is in progress
  if (isLoading && verificationAttempted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Verifying Your Email</h1>
          <p className="text-blue-600">Please wait while we verify your email address...</p>
        </div>
      </div>
    );
  }

  // Show success message if verification was successful
  if (message && verificationAttempted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified Successfully!</h1>
          <p className="text-green-600 mb-6 text-lg font-medium">
            {message}
          </p>
          <p className="text-blue-700 mb-6">
            Your email has been successfully verified. You will be redirected to the login page shortly.
          </p>
          <div className="mt-6">
            <Link to="/login">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                Go to Login Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show error if verification failed
  if (error && verificationAttempted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Email Verification Failed</h1>
          <p className="text-red-600 mb-4">
            {error.includes('expired') 
              ? 'This verification link has expired.' 
              : error.includes('Invalid') 
              ? 'This verification link is invalid or has already been used.'
              : error
            }
          </p>
          <p className="text-blue-700 mb-6">
            Please request a new verification email.
          </p>
          <Link to="/resend-verification">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mb-4">
              Resend Verification Email
            </button>
          </Link>
          <div>
            <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show invalid link message if no token
  if (!token) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Verification Link</h1>
          <p className="text-blue-700 mb-6">
            The verification link is missing or invalid.
          </p>
          <div className="space-y-3">
            <Link to="/resend-verification">
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Resend Verification Email
              </button>
            </Link>
            <Link to="/login">
              <button className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                Go to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Verifying Email...</h1>
        <p className="text-blue-600">Please wait a moment.</p>
      </div>
    </div>
  );
}

export default VerifyEmail;