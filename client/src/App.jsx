import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "./features/auth/authSlice";


// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";



function App() {
  const dispatch = useDispatch();
  const { isAuthenticated,user, isInitialized } = useSelector((state) => state.auth);

console.log("User",user);
console.log("isAuthenticated",isAuthenticated)
  useEffect(() => {
    const initAuth = async () => {
      try {
     
        const result = await dispatch(authApi.refreshToken());
        if (result.meta.requestStatus === 'fulfilled') {
          
          dispatch(authApi.getProfile());
        }
      } catch (error) {
        console.log('Authentication initialization failed');
      }
    };

    if (!isInitialized) {
      initAuth();
    }
  }, [dispatch, isInitialized]);

  return (
    <>
    <Navbar/>

    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Product />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<Orders />} />


      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/resend-verification" element={<ResendVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />



      {/* Protected routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />



       <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
         

      <Route path="*" element={<PageNotFound/>} />
    </Routes>



     
    <ToastContainer/>
    </>
  );
}

export default App;