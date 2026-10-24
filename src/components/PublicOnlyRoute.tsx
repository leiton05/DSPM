import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { PageLoader } from "./PageLoader";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  return isLoggedIn ? <Navigate to="/missions" replace /> : <>{children}</>;
}
