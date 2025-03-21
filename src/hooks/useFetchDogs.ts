import { searchDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import { useState, useEffect } from "react";
export type Favorites = Map<string, boolean>;
type SortDirection = "asc" | "desc";
export type SortField = "breed" | "name" | "age";

// Updated filter term object structure where both keys are strings.
export interface FilterTerm {
  type: string;
  value: string;
}

export const useFetchDogs = () => {
  const [dogs, setDogs] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Favorites>(new Map());
  const [searchResultTotal, setSearchResultTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(21);
  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMinMax, setAgeMinMax] = useState<number[]>([0, 14]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);

  const [adoptionMatch, setAdoptionMatch] = useState<Dog | null>(null);
  const [filterTerms, setFilterTerms] = useState<FilterTerm[]>([]);

  //   const [dogNames, setDogNames] = useState<string[]>([]);

  //   const handleSearchedDogNamesChange = (candidateSearchDogName: string) => {
  //     setDogNames((prevDogNames) => {
  //       const updatedDogNames = prevDogNames.includes(candidateSearchDogName)
  //         ? prevDogNames.filter((b) => b !== candidateSearchDogName)
  //         : [...prevDogNames, candidateSearchDogName];
  //       updateFilterTerms("dogName", candidateSearchDogName);
  //       return updatedDogNames;
  //     });
  //   };

  const handleSelectedBreedsChange = (newSelectedBreed: string) => {
    setSelectedBreeds((prevSelectedBreeds) => {
      const updatedBreeds = prevSelectedBreeds.includes(newSelectedBreed)
        ? prevSelectedBreeds.filter((b) => b !== newSelectedBreed)
        : [...prevSelectedBreeds, newSelectedBreed];

      updateFilterTerms("breed", newSelectedBreed);
      return updatedBreeds;
    });
  };

  const handleZipCodesChange = (newZipCode: string) => {
    setZipCodes((prevZipCodes) => {
      return [...prevZipCodes, newZipCode];
    });
    updateFilterTerms("zipCode", newZipCode);
  };

  const updateFilterTerms = (type: string, value: string) => {
    setFilterTerms((prevTerms) => {
      const newTerms = prevTerms.filter(
        (term) => !(term.type === type && term.value === value)
      );

      if (
        !prevTerms.some((term) => term.type === type && term.value === value)
      ) {
        newTerms.push({ type, value });
      }

      return newTerms;
    });
  };

  const removeFilterTerm = (type: string, value: string) => {
    // Remove the filter term from the filterTerms array.
    setFilterTerms((prevTerms) =>
      prevTerms.filter((term) => !(term.type === type && term.value === value))
    );

    // Optionally, update other related state.
    if (type === "breed") {
      setSelectedBreeds((prevBreeds) =>
        prevBreeds.filter((breed) => breed !== value)
      );
    } else if (type === "zipCode") {
      setZipCodes((prevZipCodes) =>
        prevZipCodes.filter((zip) => zip !== value)
      );
    }
    // Extend to other types if necessary.
  };

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const from = ((currentPage - 1) * resultsPerPage).toString();
        const sort = `${sortField}:${sortDirection}`;
        const [ageMin, ageMax] = ageMinMax;

        const dogsResponse = await searchDogs({
          sort,
          size: resultsPerPage,
          from,
          breeds: selectedBreeds,
          zipCodes,
          ageMax,
          ageMin,
        });
        const { resultIds, total } = dogsResponse;

        setDogs(resultIds);
        setSearchResultTotal(total);
        setTotalPages(Math.ceil(total / resultsPerPage));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDogs();
  }, [
    currentPage,
    resultsPerPage,
    selectedBreeds,
    zipCodes,
    ageMinMax,
    sortField,
    sortDirection,
  ]);

  return {
    dogs,
    favorites,
    setFavorites,
    searchResultTotal,
    totalPages,
    currentPage,
    setCurrentPage,
    resultsPerPage,
    setResultsPerPage,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    selectedBreeds,
    handleSelectedBreedsChange,
    handleZipCodesChange,
    ageMinMax,
    setAgeMinMax,
    adoptionMatch,
    setAdoptionMatch,
    filterTerms,
    removeFilterTerm,
    // handleSearchedDogNamesChange,
  };
};
