import { createSlice } from "@reduxjs/toolkit";
import { clearAccessToken } from "../../utils/tokenUtils";
import * as authApi from "./authApi";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = null;
      clearAccessToken();
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(authApi.registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authApi.registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(authApi.registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Verify Email
    builder
      .addCase(authApi.verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authApi.verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(authApi.verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Resend Verification
    builder
      .addCase(authApi.resendVerification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authApi.resendVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(authApi.resendVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(authApi.loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authApi.loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(authApi.loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Forgot Password
    builder
      .addCase(authApi.forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authApi.forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(authApi.forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Reset Password
    builder
      .addCase(authApi.resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authApi.resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(authApi.resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Refresh Token
    builder
      .addCase(authApi.refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authApi.refreshToken.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(authApi.refreshToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true;
      });

    // Get Profile
    builder
      .addCase(authApi.getProfile.pending, (state) => {
        if (!state.user) state.isLoading = true;
      })
      .addCase(authApi.getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(authApi.getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isInitialized = true;
      });

    // Logout
    builder
      .addCase(authApi.logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authApi.logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(authApi.logoutUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        state.message = null;
      });
  },
});

export const { logout, clearError, clearMessage, setUser, setInitialized } = authSlice.actions;
export { authApi };
export default authSlice.reducer;