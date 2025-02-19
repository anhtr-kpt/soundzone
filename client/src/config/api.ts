import store from "@/store";
import { logout } from "@/store/slices/authSlice";
import axios from "axios";

export const API_URL =
  import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/users/refresh-token", {
          refreshToken,
        });
        const { authToken, refreshToken: newRefreshToken } =
          response.data.tokens;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        originalRequest.headers.Authorization = `Bearer ${authToken}`;
        return api(originalRequest);
      } catch (error) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export interface APIResponse<T> {
  data: T;
  message: string;
  status: number;
}
