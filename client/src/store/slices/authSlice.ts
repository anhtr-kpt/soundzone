import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth.types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/localStorage";

const initialState: AuthState = {
  user: getLocalStorageItem<User>("user"),
  token: getLocalStorageItem<string>("token"),
  isAuthenticated: !!getLocalStorageItem<string>("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      setLocalStorageItem("user", user);
      setLocalStorageItem("token", token);
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      removeLocalStorageItem("user");
      removeLocalStorageItem("token");
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setLocalStorageItem("user", action.payload);
    },
  },
});

export const { setCredentials, clearCredentials, updateUser } =
  authSlice.actions;

export default authSlice.reducer;
