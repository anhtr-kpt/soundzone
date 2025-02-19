export interface IProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: "admin" | "user";
}
