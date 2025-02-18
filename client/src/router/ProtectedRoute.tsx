import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./types";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (user) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
};
