import React, { useEffect } from "react";
import { checkAuth } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import LoadingSpinner from "@/common/components/LoadingSpinner";

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AppInitializer;
