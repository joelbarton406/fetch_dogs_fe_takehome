// src/features/favorites/FavoritesPage.tsx
import React from "react";
import { useFavorites } from "./FavoritesContext";
import { Link } from "react-router-dom";

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="favorites-page">
      <h1>Your Favorite Dogs</h1>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any dogs to your favorites yet.</p>
          <Link to="/search" className="btn">
            Search for Dogs
          </Link>
        </div>
      ) : (
        <>
          <div className="favorites-list">
            {favorites.map((dog) => (
              <div key={dog.id} className="favorite-item">
                <img src={dog.img} alt={dog.name} />
                <div className="favorite-info">
                  <h3>{dog.name}</h3>
                  <p>Breed: {dog.breed}</p>
                  <p>Age: {dog.age} years</p>
                  <button onClick={() => removeFavorite(dog.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="favorites-actions">
            <Link to="/match" className="btn primary">
              Generate Match
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
