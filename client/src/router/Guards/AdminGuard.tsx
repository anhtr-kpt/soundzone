import { useAppSelector } from "@/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminGuard {
  children: ReactNode;
}

export const AdminGuard: React.FC<AdminGuard> = ({ children }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === "admin";

  return isAuthenticated && isAdmin ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};
