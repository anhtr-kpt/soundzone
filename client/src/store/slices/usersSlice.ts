import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/types";
import { usersApi } from "@/api/usersApi";
import toast from "react-hot-toast";

interface IUsersState {
  user: IUser | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: IUsersState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(usersApi.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          state.isAuthenticated = true;
          state.user = action.payload.data?.user || null;
          localStorage.setItem(
            "accessToken",
            action.payload.data?.tokens.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            action.payload.data?.tokens.refreshToken
          );
          window.location.href = "/admin";
          toast.success(action.payload.message);
        } else {
          state.error = action.payload.message;
          toast.error(state.error);
        }
      })
      .addMatcher(usersApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.error.message || "Login failed!";
        toast.error(state.error);
      })
      .addMatcher(usersApi.endpoints.signup.matchFulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        } else {
          state.error = action.payload.message;
          toast.error(state.error);
        }
      })
      .addMatcher(usersApi.endpoints.signup.matchRejected, (state, action) => {
        state.error = action.error.message || "Sign up failed!";
        toast.error(state.error);
      })
      .addMatcher(
        usersApi.endpoints.checkAuth.matchFulfilled,
        (state, action) => {
          if (action.payload.success) {
            state.isAuthenticated = true;
            if (action.payload.data?.user) {
              state.user = action.payload.data.user;
            }
          } else {
            state.isAuthenticated = false;
          }
        }
      )
      .addMatcher(usersApi.endpoints.checkAuth.matchRejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export default usersSlice.reducer;
