import { useState, useContext, useEffect } from "react";

import { DogsContext } from "@/contexts/DogsContext";
import BreedComboBox from "@/components/BreedComboBox";
import AgeSlider from "@/components/AgeSlider";
import DogLocationInput from "@/components/DogLocationInput";
import DogNameInput from "@/components/DogNameInput";

import FilterBank from "@/components/FilterBank";
import FavoritesMatch from "@/components/FavoritesMatch";
import SearchButton from "@/components/SearchButton";
import SearchCount from "@/components/SearchCount";

export type Filters = {
  selectedBreeds: string[];
  ageMinMax: number[];
  zipCodes: string[];
};

const FiltersMenu = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { dispatch, state } = ctx;

  const [filters, setFilters] = useState<Filters>({
    ageMinMax: [0, 14],
    selectedBreeds: [],
    zipCodes: [],
  });

  const [showFilterBank, setShowFilterBank] = useState(false);

  useEffect(() => {
    setFilters({
      ageMinMax: state.ageMinMax,
      selectedBreeds: state.selectedBreeds,
      zipCodes: state.zipCodes,
    });
  }, [state.ageMinMax, state.selectedBreeds, state.zipCodes]);

  const handleSearchClick = () => {
    dispatch({
      type: "UPDATE_SELECTED_BREEDS",
      payload: filters.selectedBreeds,
    });
    dispatch({ type: "UPDATE_SELECTED_ZIPCODES", payload: filters.zipCodes });
    dispatch({ type: "UPDATE_AGE_MIN_MAX", payload: filters.ageMinMax });
    dispatch({ type: "UPDATE_CURRENT_PAGE", payload: 1 });
    setShowFilterBank(true);
  };

  return (
    <div
      id="dogs-search-filter-container"
      className="mt-2 bg-white shadow-lg rounded-xl p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
          <BreedComboBox filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-span-1">
          <AgeSlider filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-span-1">
          <DogLocationInput filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-span-1">
          <DogNameInput />
        </div>
      </div>
      <div className="">
        {showFilterBank && (
          <FilterBank filters={filters} setFilters={setFilters} />
        )}
      </div>
      <div className="flex justify-end mt-2 space-x-4">
        <FavoritesMatch />
        <SearchButton handleSearchClick={handleSearchClick} />
        <SearchCount />
      </div>
    </div>
  );
};

export default FiltersMenu;
