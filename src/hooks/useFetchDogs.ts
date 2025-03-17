import { searchDogs } from "@/api/dogs";
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
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(14);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const from = ((currentPage - 1) * resultsPerPage).toString();
        const sort = `${sortField}:${sortDirection}`;

        const response = await searchDogs({
          sort: sort,
          size: resultsPerPage,
          from: from,
          breeds: selectedBreeds,
          zipCodes: zipCodes,
          ageMax: ageMax,
          ageMin: ageMin,
        });

        const { resultIds, total } = response.data;
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
    ageMin,
    ageMax,
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
    ageMin,
    setAgeMin,
    ageMax,
    setAgeMax,
  };
};
