import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute"; 
import { getToken } from "./utils/authUtils";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PublicPage from "./pages/PublicPage";
import ManageUsersPage from "./components/Admin/ManageUsersPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getToken();
      const storedUser = JSON.parse(localStorage.getItem("user") || '{}');
      setIsAuthenticated(!!token);
      setIsAdmin(storedUser?.role === "admin");
      setLoadingAuth(false);
    };

    initializeAuth();
  }, []);

  if (loadingAuth) {
    return <div>Loading authentication...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicPage isAuthenticated={isAuthenticated} />} />
      <Route path="/public" element={<PublicPage isAuthenticated={isAuthenticated} />} />
      <Route
        path="/login"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      {/* Admin Protected Routes */}
      <Route
        path="/manage-users"
        element={
          <AdminProtectedRoute
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
          >
            <ManageUsersPage />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
