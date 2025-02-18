import { IUser } from "@/types";
import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const response = await axios.get("/api/users/me");
          setUser(response.data.data.user);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post("/api/users/refresh-token", {
              refreshToken,
            });

            const { authToken, refreshToken: newRefreshToken } =
              response.data.data.tokens;

            localStorage.setItem("authToken", authToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${authToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${authToken}`;

            return axios(originalRequest);
          } catch (error) {
            await logout();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      const { user, tokens } = response.data.data;

      localStorage.setItem("authToken", tokens.authToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokens.authToken}`;

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await axios.post("/api/users/register", {
        email,
        password,
        name,
      });

      const { user, tokens } = response.data.data;

      localStorage.setItem("authToken", tokens.authToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokens.authToken}`;

      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
