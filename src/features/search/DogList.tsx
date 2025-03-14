import React from "react";
import { Dog } from "../../types/api";
import { DogCard } from "./DogCard";

interface DogListProps {
  dogs: Dog[];
}

export const DogList: React.FC<DogListProps> = ({ dogs }) => {
  return (
    <div className="dog-list">
      {dogs.length === 0 ? (
        <p>No dogs found matching your criteria.</p>
      ) : (
        <div className="dog-grid">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </div>
      )}
    </div>
  );
};
