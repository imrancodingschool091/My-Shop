import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { AUTH_ENDPOINTS } from "../../utils/constant";
import { setAccessToken, clearAccessToken } from "../../utils/tokenUtils";

// Async thunks
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials);
      setAccessToken(res.data.accessToken);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${AUTH_ENDPOINTS.VERIFY_EMAIL}/${token}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Email verification failed");
    }
  }
);

export const resendVerification = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.RESEND_VERIFICATION, { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to resend verification email");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to send password reset email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${AUTH_ENDPOINTS.RESET_PASSWORD}/${token}`, { password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Password reset failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH, {});
      setAccessToken(res.data.accessToken);
      return res.data;
    } catch (err) {
      clearAccessToken();
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(AUTH_ENDPOINTS.PROFILE);
      return res.data.user;
    } catch (err) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT, {});
      clearAccessToken();
      return true;
    } catch (err) {
      clearAccessToken();
      return true;
    }
  }
);