import { AuthResponse, SignInRequest } from "@/types/auth.types";
import { apiSlice } from "./apiSlice";
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  SignUpRequest,
} from "@/types/auth.types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/signout",
        method: "GET",
      }),
      invalidatesTags: ["User", "Admin"],
    }),
    getMe: builder.query<AuthResponse, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation<
      { success: boolean; message: string },
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgotpassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      AuthResponse,
      { token: string; data: ResetPasswordRequest }
    >({
      query: ({ token, data }) => ({
        url: `/auth/resetpassword/${token}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
