import { Navigate } from "react-router-dom";
import { IProtectedRouteProps } from "./types";
import { useAppSelector } from "@/store";
import LoadingSpinner from "@/common/components/LoadingSpinner";

export const ProtectedRoute = ({
  children,
  requiredRole,
}: IProtectedRouteProps) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};
