import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "./types";

export const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
};
