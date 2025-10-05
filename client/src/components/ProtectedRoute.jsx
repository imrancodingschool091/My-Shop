import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authApi } from "../features/auth/authSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, isInitialized } = useSelector((state) => state.auth);

  // Check authentication status on mount if not initialized
  useEffect(() => {
    if (!isInitialized && !isAuthenticated) {
      dispatch(authApi.refreshToken())
        .unwrap()
        .then(() => {
          // If refresh successful, get user profile
          dispatch(authApi.getProfile());
        })
        .catch(() => {
          // Refresh failed, user is not authenticated
          console.log("Authentication check failed");
        });
    }
  }, [dispatch, isInitialized, isAuthenticated]);

  // Show loading while checking authentication
  if (!isInitialized || isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;