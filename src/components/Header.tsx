import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-semibold text-gray-800">Fetch Dogs</h1>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">Welcome, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-gray-500 text-sm px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
