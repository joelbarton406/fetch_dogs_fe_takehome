import { searchDogs } from "@/api/dogs";
import { useState, useEffect } from "react";

export type Favorites = Map<string, boolean>;
export const useFetchDogs = (selectedBreeds: string[]) => {
  const [dogs, setDogs] = useState<string[]>([]);
  const [searchResultTotal, setSearchResultTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(3);

  const [favorites, setFavorites] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const from = (currentPage - 1) * resultsPerPage;
        const response = await searchDogs({
          sort: "breed:asc",
          size: resultsPerPage,
          from: from.toString(),
          breeds: selectedBreeds,
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
  }, [currentPage, resultsPerPage, selectedBreeds]);

  return {
    dogs,
    searchResultTotal,
    totalPages,
    currentPage,
    setCurrentPage,
    resultsPerPage,
    setResultsPerPage,
    favorites,
    setFavorites,
  };
};
