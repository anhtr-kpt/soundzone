import { useAppSelector } from "@/store";
import { useGetMeQuery } from "@/store/api/authApi";

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const { data, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: !auth.isAuthenticated,
  });

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.user?.role === "admin",
    isUser: auth.user?.role === "user",
    isLoading,
    refetch,
    serverUser: data?.data?.user,
  };
};
