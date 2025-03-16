import { ReactNode, createContext, useEffect, useState } from "react";
import { getBreeds, searchDogs } from "@/api/dogs";

type Favorites = Map<string, boolean>;
interface DogsContextType {
  breeds: string[];
  dogs: string[];
  searchResultTotal: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  resultsPerPage: number;
  setResultsPerPage: React.Dispatch<React.SetStateAction<number>>;

  favorites: Favorites;
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>;
}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<string[]>([]);
  const [searchResultTotal, setSearchResultTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState<Map<string, boolean>>(new Map()); // save user's favorites in local storage

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreeds();
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    const fetchDogs = async () => {
      try {
        const from = (currentPage - 1) * resultsPerPage;

        const response = await searchDogs({
          sort: "breed:asc",
          size: resultsPerPage,
          from: from.toString(),
          //   breeds: ["German Shepherd"],
          //   ageMax: 4,
        });

        const { resultIds, total } = response.data;

        setDogs(resultIds);
        setSearchResultTotal(total);
        setTotalPages(Math.ceil(total / resultsPerPage));
      } catch (error: unknown) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchBreeds(), fetchDogs()]);
    };

    fetchData();
  }, [currentPage, resultsPerPage]);

  return (
    <DogsContext.Provider
      value={{
        breeds,
        dogs,
        searchResultTotal,
        totalPages,
        currentPage,
        setCurrentPage,
        resultsPerPage,
        setResultsPerPage,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
