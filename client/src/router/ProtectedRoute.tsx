import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./types";
import { useAppDispatch, useAppSelector } from "@/store";

export const ProtectedRoute = ({ outlet }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role === "admin") return outlet;
};
