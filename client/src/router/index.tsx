import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminRoutes, userRoutes, adminAuthRoutes } from "./routes";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";

const router = createBrowserRouter([
  ...userRoutes,
  ...adminAuthRoutes,

  {
    path: "/admin/*",
    element: (
      <ProtectedRoute
        isAuthenticated={true}
        authenticationPath="/login"
        outlet={<AdminLayout />}
      />
    ),
    children: adminRoutes,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
