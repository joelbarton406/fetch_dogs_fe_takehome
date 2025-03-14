// src/features/search/DogSearch.tsx
import React, { useState, useEffect } from "react";
import { getBreeds, searchDogs, getDogs } from "../../api/dogs";
import { BreedFilter } from "./BreedFilter";
import { DogList } from "./DogList";
import { Pagination } from "../../components/Pagination";
import { Dog } from "../../types/api";
import { useSearchParams } from "react-router-dom";

export const DogSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);

  // Load breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreeds();
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  // Load dogs
  const fetchDogs = async () => {
    setLoading(true);
    try {
      const searchParams: any = {
        sort: `breed:${sortOrder}`,
        size: 25,
      };

      if (selectedBreeds.length > 0) {
        searchParams.breeds = selectedBreeds;
      }

      // Add pagination cursor if available
      if (nextCursor && currentPage > 1) {
        searchParams.from = nextCursor;
      }

      const searchResponse = await searchDogs(searchParams);
      setTotal(searchResponse.data.total);
      setNextCursor(searchResponse.data.next || null);
      setPrevCursor(searchResponse.data.prev || null);

      // Fetch dog details
      const dogIds = searchResponse.data.resultIds;
      const dogsResponse = await getDogs(dogIds);
      setDogs(dogsResponse.data);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [selectedBreeds, sortOrder, currentPage]);

  const handleBreedChange = (breeds: string[]) => {
    setSelectedBreeds(breeds);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="dog-search">
      <h1>Find Your Perfect Dog</h1>

      <div className="search-controls">
        <BreedFilter
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          onChange={handleBreedChange}
        />

        <div className="sort-controls">
          <label>Sort by breed:</label>
          <select
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <DogList dogs={dogs} />
          <Pagination
            currentPage={currentPage}
            hasNext={!!nextCursor}
            hasPrev={!!prevCursor}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
