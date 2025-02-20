import { api } from "@/config/api";
import { ILoginInput, ISignUpInput } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface IAuthState {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isCheckingAuth: false,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (input: ILoginInput) => {
    const response = await api.post("/auth/login", input);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (input: ISignUpInput) => {
    const response = await api.post("/auth/signup", input);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
);

export const checkAuth = createAsyncThunk("auth/check-auth", async () => {
  const response = await api.get("/auth/check-auth");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed!";
        toast.error(state.error);
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Sign up failed!";
        toast.error(state.error);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.isCheckingAuth = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isCheckingAuth = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
