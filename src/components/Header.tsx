import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { useFavorites } from "../features/favorites/FavoritesContext";

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <header>
      <div className="logo">
        <h1>Fetch Dog Adoption</h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/search">Search Dogs</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites ({favorites.length})</Link>
          </li>
          <li>
            <Link to="/match">Generate Match</Link>
          </li>
        </ul>
      </nav>
      <div className="user-controls">
        <span>Welcome, {user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};
