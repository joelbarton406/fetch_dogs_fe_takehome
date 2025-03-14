// src/features/search/BreedFilter.tsx
import React from "react";

interface BreedFilterProps {
  breeds: string[];
  selectedBreeds: string[];
  onChange: (breeds: string[]) => void;
}

export const BreedFilter: React.FC<BreedFilterProps> = ({
  breeds,
  selectedBreeds,
  onChange,
}) => {
  const handleBreedChange = (breed: string) => {
    if (selectedBreeds.includes(breed)) {
      onChange(selectedBreeds.filter((b) => b !== breed));
    } else {
      onChange([...selectedBreeds, breed]);
    }
  };

  return (
    <div className="breed-filter">
      <h3>Filter by Breed</h3>
      <div className="breed-list">
        {breeds.map((breed) => (
          <label key={breed} className="breed-item">
            <input
              type="checkbox"
              checked={selectedBreeds.includes(breed)}
              onChange={() => handleBreedChange(breed)}
            />
            {breed}
          </label>
        ))}
      </div>
    </div>
  );
};
