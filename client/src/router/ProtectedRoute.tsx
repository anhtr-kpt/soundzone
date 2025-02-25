import { Navigate } from "react-router-dom";
import { IProtectedRouteProps } from "./types";
import { useAppSelector } from "@/store";
import { useCheckAuthQuery } from "@/api/usersApi";

export const ProtectedRoute = ({
  children,
  requiredRole,
}: IProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.users);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if (requiredRole && user.role !== requiredRole) {
  //   if (user.role === "user") {
  //     return <Navigate to="/" replace />;
  //   }

  //   return <Navigate to="/admin" replace />;
  // }

  console.log(user);

  return children;
};
