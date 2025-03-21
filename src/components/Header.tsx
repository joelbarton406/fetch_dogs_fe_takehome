import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Fetch Dogs
        </h1>

        <div className="flex items-center space-x-5">
          <span className="text-gray-700 text-sm font-medium">
            Welcome, {user?.name}
          </span>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
