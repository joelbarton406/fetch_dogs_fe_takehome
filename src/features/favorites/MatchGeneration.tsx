// src/features/favorites/MatchGeneration.tsx
import React, { useState } from "react";
import { useFavorites } from "./FavoritesContext";
import { getMatch, getDogs } from "../../api/dogs";
import { Dog } from "../../types/api";

export const MatchGeneration: React.FC = () => {
  const { favorites } = useFavorites();
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMatch = async () => {
    if (favorites.length === 0) {
      setError("Please add some favorites first!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get the IDs of all favorite dogs
      const favoriteIds = favorites.map((dog) => dog.id);

      // Generate a match
      const matchResponse = await getMatch(favoriteIds);
      const matchId = matchResponse.data.match;

      // Fetch the matched dog details
      const dogResponse = await getDogs([matchId]);
      setMatchedDog(dogResponse.data[0]);
    } catch (err: unknown) {
      console.log(err);
      setError("Failed to generate a match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-generation">
      <h2>Generate Your Perfect Match</h2>
      <p>You have {favorites.length} dogs in your favorites list.</p>

      <button
        onClick={generateMatch}
        disabled={favorites.length === 0 || loading}
      >
        {loading ? "Generating..." : "Generate Match"}
      </button>

      {error && <div className="error">{error}</div>}

      {matchedDog && (
        <div className="matched-dog">
          <h3>Your Perfect Match: {matchedDog.name}</h3>
          <img src={matchedDog.img} alt={matchedDog.name} />
          <p>Breed: {matchedDog.breed}</p>
          <p>Age: {matchedDog.age}</p>
          <p>Location: {matchedDog.zip_code}</p>
        </div>
      )}
    </div>
  );
};
