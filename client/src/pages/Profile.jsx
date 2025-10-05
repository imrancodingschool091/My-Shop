import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authApi.getProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(authApi.logoutUser());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-blue-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100 p-8 transition-all">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-md mb-4">
            <span className="text-white text-3xl font-semibold">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-blue-800">{user?.username}</h1>
          <p className="text-blue-600">{user?.email}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-blue-100 my-6"></div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-blue-500 uppercase font-medium tracking-wide">Username</p>
            <p className="font-semibold text-gray-800">{user?.username}</p>
          </div>
          <div>
            <p className="text-sm text-blue-500 uppercase font-medium tracking-wide">Email</p>
            <p className="font-semibold text-gray-800">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-blue-500 uppercase font-medium tracking-wide">Status</p>
            <p className="font-semibold text-green-600">Verified</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full py-3 mb-4 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all"
          >
            My Orders
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold shadow-md hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
