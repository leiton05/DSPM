import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { PageLoader } from "./PageLoader";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return <PageLoader />;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};
