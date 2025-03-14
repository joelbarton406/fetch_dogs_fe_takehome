import React from "react";
import { Dog } from "../../types/api";
import { useFavorites } from "../favorites/FavoritesContext";

interface DogCardProps {
  dog: Dog;
}

export const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(dog.id);

  const handleFavoriteToggle = () => {
    if (favorited) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }
  };

  return (
    <div className="dog-card">
      <div className="dog-image">
        <img src={dog.img} alt={dog.name} />
      </div>
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age} years</p>
        <p>Location: {dog.zip_code}</p>
        <button
          onClick={handleFavoriteToggle}
          className={favorited ? "favorite-btn active" : "favorite-btn"}
        >
          {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};
