import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white shadow-sm border-b border-pink-600">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Fetch Dogs</h1>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">Welcome, {user?.name}</span>
          <Button variant='ghost' onClick={handleLogout} className="">Logout</Button>
        </div>
      </div>
    </header>
  );
};
