import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../features/orders/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders = [], isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>

      {isLoading ? (
        <p className="text-gray-500 text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Order #{order._id?.slice(-6).toUpperCase() || "N/A"}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "processing"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status
                  ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  : "Unknown"}
              </span>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
             
              <p>
                <span className="font-medium">Shipping:</span>{" "}
                {order.shippingAddress?.city || "N/A"},{" "}
                {order.shippingAddress?.country || "N/A"}
              </p>
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Items */}
            <h4 className="text-md font-semibold text-gray-700 mb-3">Items:</h4>
            <div className="space-y-3">
              {order.orderItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.image || ""}
                      alt={item.product?.name || "Product"}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.product?.name || "Product Name"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity || 0}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-700">
                    ₹{item.product?.price?.toLocaleString() || 0}
                  </p>
                </div>
              )) || <p className="text-gray-500">No items found.</p>}
            </div>

            <hr className="border-gray-200 my-4" />

            {/* Total */}
            <div className="flex justify-end">
              <p className="text-lg font-bold text-gray-800">
                Total: ₹{order.totalPrice?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
