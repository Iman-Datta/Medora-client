import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "./authAPI";

const initialState = {
  email: localStorage.getItem("medora_email") || null,
  fullName: localStorage.getItem("medora_fullName") || null,
  avatarUrl: localStorage.getItem("medora_avatarUrl") || null,
  accessToken: localStorage.getItem("medora_accessToken") || null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authAPI.login(credentials);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await authAPI.register(userData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await authAPI.forgotPassword(email);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

function persistCredentials(state, payload) {
  state.email = payload.email;
  state.fullName = payload.fullName;
  state.avatarUrl = payload.avatarUrl;
  state.accessToken = payload.accessToken;
  localStorage.setItem("medora_email", payload.email || "");
  localStorage.setItem("medora_fullName", payload.fullName || "");
  localStorage.setItem("medora_avatarUrl", payload.avatarUrl || "");
  localStorage.setItem("medora_accessToken", payload.accessToken || "");
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = null;
      state.fullName = null;
      state.avatarUrl = null;
      state.accessToken = null;
      localStorage.removeItem("medora_email");
      localStorage.removeItem("medora_fullName");
      localStorage.removeItem("medora_avatarUrl");
      localStorage.removeItem("medora_accessToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        persistCredentials(state, action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        persistCredentials(state, action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;