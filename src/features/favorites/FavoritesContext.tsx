import React, { createContext, useState, useContext, ReactNode } from "react";
import { Dog } from "../../types/api";

interface FavoritesContextType {
  favorites: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Dog[]>([]);

  const addFavorite = (dog: Dog) => {
    setFavorites((prev) => [...prev, dog]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((dog) => dog.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((dog) => dog.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
