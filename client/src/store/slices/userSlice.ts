// import { api } from "@/config/api";
// import { ILoginInput, ISignUpInput, IUser } from "@/types";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// export const checkAuth = createAsyncThunk<IUser | null>(
//   "auth/checkAuth",
//   async (_, thunkAPI) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       try {
//         const response = await api.get("/users/me");
//         return response.data.user as IUser;
//       } catch (error: any) {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("refreshToken");
//         delete api.defaults.headers.common["Authorization"];
//         return thunkAPI.rejectWithValue(error.response.data);
//       }
//     }

//     return null;
//   }
// );

// export const login = createAsyncThunk<
//   IUser,
//   { email: string; password: string }
// >("auth/login", async ({ email, password }, thunkAPI) => {
//   try {
//     const response = await api.post("/users/login", {
//       email,
//       password,
//     });

//     const { user, tokens } = response.data;
//     localStorage.setItem("authToken", tokens.authToken);
//     localStorage.setItem("refreshToken", tokens.refreshToken);
//     api.defaults.headers.common["Authorization"] = `Bearer ${tokens.authToken}`;
//     return user as IUser;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// export const register = createAsyncThunk<
//   IUser,
//   { email: string; password: string; name: string }
// >("auth/register", async ({ email, password, name }, thunkAPI) => {
//   try {
//     const response = await api.post("/users/register", {
//       email,
//       password,
//       name,
//     });
//     const { user, tokens } = response.data;
//     localStorage.setItem("authToken", tokens.authToken);
//     localStorage.setItem("refreshToken", tokens.refreshToken);
//     api.defaults.headers.common["Authorization"] = `Bearer ${tokens.authToken}`;
//     return user as IUser;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     await api.post("/users/logout");
//   } catch (error) {
//     console.error("Logout error:", error);
//   } finally {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("refreshToken");
//     delete api.defaults.headers.common["Authorization"];
//     return null;
//   }
// });

// const authSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(checkAuth.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(
//       checkAuth.fulfilled,
//       (state, action: PayloadAction<IUser | null>) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       }
//     );
//     builder.addCase(checkAuth.rejected, (state, action) => {
//       state.isLoading = false;
//       state.user = null;
//       state.error = "Authentication failed";
//     });
//     builder.addCase(login.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     });
//     builder.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
//       state.isLoading = false;
//       state.user = action.payload;
//     });
//     builder.addCase(login.rejected, (state, action) => {
//       state.isLoading = false;
//       state.user = null;
//       state.error = "Login failed";
//     });
//     builder.addCase(register.pending, (state) => {
//       state.isLoading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       register.fulfilled,
//       (state, action: PayloadAction<IUser>) => {
//         state.isLoading = false;
//         state.user = action.payload;
//       }
//     );
//     builder.addCase(register.rejected, (state, action) => {
//       state.isLoading = false;
//       state.user = null;
//       state.error = "Register failed";
//     });
//     builder.addCase(logout.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(logout.fulfilled, (state) => {
//       state.isLoading = false;
//       state.user = null;
//     });
//     builder.addCase(logout.rejected, (state) => {
//       state.isLoading = false;
//       state.user = null;
//     });
//   },
// });

// export default authSlice.reducer;
