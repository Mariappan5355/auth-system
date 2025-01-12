import React from "react";
import { Navigate } from "react-router-dom";

interface AdminProtectedRouteProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  isAuthenticated,
  isAdmin,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
