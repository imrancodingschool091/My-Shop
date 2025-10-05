// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, resetOrderState } from "../features/orders/orderSlice";
import { getCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { showSuccess } from "../utils/message";
import Loader from "../components/Loader";
import axios from "axios";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice, isLoading: cartLoading } = useSelector((state) => state.cart);
  const { isLoading, isError, message } = useSelector((state) => state.order);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "", address: "", city: "", postalCode: "", country: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingAddress.fullName.trim()) newErrors.fullName = "Full name required";
    if (!shippingAddress.address.trim()) newErrors.address = "Address required";
    if (!shippingAddress.city.trim()) newErrors.city = "City required";
    if (!/^\d{4,10}$/.test(shippingAddress.postalCode)) newErrors.postalCode = "Invalid postal code";
    if (!shippingAddress.country.trim()) newErrors.country = "Country required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💳 Handle Razorpay payment
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: totalPrice,
      });

      if (!data.success) {
        alert("Failed to create payment order");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "E-shop",
        description: "Order Payment",
        order_id: data.order.id,
        prefill: {
          name: shippingAddress.fullName,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" },
        handler: async (response) => {
          // Verify payment
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            // Place order in DB
            dispatch(placeOrder({ shippingAddress }))
              .unwrap()
              .then(() => {
                showSuccess("Order placed successfully 🎉");
                dispatch(resetOrderState());
                navigate("/my-orders");
              });
          } else {
            alert("Payment verification failed");
          }
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while initiating payment");
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty");
    if (!validateForm()) return;
    handlePayment();
  };

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(resetOrderState());
    }
  }, [isError, message, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <ShoppingCart className="w-8 h-8 text-blue-600" /> Checkout
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartLoading ? <Loader /> : cartItems.length === 0 ? <p>Your cart is empty</p> :
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <li key={item.product._id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm">{item.quantity} × ₹{item.product.price}</p>
                </div>
                <p className="font-semibold">₹{(item.quantity * item.product.price).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        }
        <div className="flex justify-between mt-4 text-lg font-bold">
          <span>Total:</span>
          <span>₹{totalPrice ? totalPrice.toFixed(2) : "0.00"}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        {["fullName","address","city","postalCode","country"].map(field => (
          <div key={field}>
            <input type="text" name={field} placeholder={field} value={shippingAddress[field]} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
