import { Navigate } from "react-router-dom"

import type { ReactNode } from "react";
import useAuthStore from "./store/useAuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {  
  const currentUser = useAuthStore((s) => s.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;