import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
import { authApi } from "@/api/authApi";
import toast from "react-hot-toast";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const loadAuthFromStorage = (): {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
} => {
  try {
    const userString = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
      user: userString ? JSON.parse(userString) : null,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Error loading auth from localStorage:", error);
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
    };
  }
};

const { user, accessToken, refreshToken } = loadAuthFromStorage();

const initialState: AuthState = {
  user,
  accessToken,
  refreshToken,
  isAuthenticated: !!user && !!accessToken,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
          state.user = action.payload.data;

          localStorage.setItem("user", JSON.stringify(action.payload.data));
          localStorage.setItem("accessToken", action.payload.data.accessToken);
          localStorage.setItem(
            "refreshToken",
            action.payload.data.refreshToken
          );
          toast.success(action.payload.message);
          if (state.user.role === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        } else {
          state.error = action.payload.message;
          toast.error(state.error);
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.error.message || "Login failed!";
        toast.error(state.error);
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        } else {
          state.error = action.payload.message;
          toast.error(state.error);
        }
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state, action) => {
        state.error = action.error.message || "Sign up failed!";
        toast.error(state.error);
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;

          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        } else {
          state.error = action.payload.message;
          toast.error(state.error);
        }
      });
    // .addMatcher(
    //   authApi.endpoints.checkAuth.matchFulfilled,
    //   (state, action) => {
    //     if (action.payload.success) {
    //       state.isAuthenticated = true;
    //       if (action.payload.data?.user) {
    //         state.user = action.payload.data.user;
    //       }
    //     } else {
    //       state.isAuthenticated = false;
    //     }
    //   }
    // )
    // .addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) => {
    //   state.isAuthenticated = false;
    // });
  },
});

export const { setNewTokens } = authSlice.actions;

export default authSlice.reducer;
