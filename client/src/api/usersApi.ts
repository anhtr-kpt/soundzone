import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/config/baseQuery";
import { ILoginInput, ISignUpInput, IUser } from "@/types";

interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<UsersResponse, ILoginInput>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<UsersResponse, ISignUpInput>({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation<UsersResponse, void>({
      query: () => ({
        url: "/users/logout",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    checkAuth: builder.query<UsersResponse, void>({
      query: () => "/users/get-me",
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useCheckAuthQuery } =
  usersApi;
