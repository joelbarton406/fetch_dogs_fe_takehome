import { searchDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import { useState, useEffect } from "react";
export type Favorites = Map<string, boolean>;
type SortDirection = "asc" | "desc";
export type SortField = "breed" | "name" | "age";

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
    setSelectedBreeds,
    zipCodes,
    setZipCodes,
    ageMinMax,
    setAgeMinMax,
    adoptionMatch,
    setAdoptionMatch,
  };
};
