import { Navigate, Outlet } from "react-router-dom";
import React, { useMemo } from "react";
import { useIsAuthenticated } from "react-auth-kit";

export const AuthState: React.FC = React.memo(() => {
  const isAuthenticated = useIsAuthenticated();

  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
});
