import { JSX } from "react";

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
}
