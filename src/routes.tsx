// src/routes.tsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "./features/auth/LoginForm";
import { DogSearch } from "./features/search/DogSearch";
import { FavoritesPage } from "./features/favorites/FavoritesPage";
import { MatchGeneration } from "./features/favorites/MatchGeneration";
import { useAuth } from "./features/auth/AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <DogSearch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/match"
        element={
          <ProtectedRoute>
            <MatchGeneration />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
