import { ReactNode, createContext } from "react";
import { useFetchDogs } from "@/hooks/useFetchDogs";
import { useFetchBreeds } from "@/hooks/useFetchBreeds";
import { useFetchLocation } from "@/hooks/useFetchLocation";

interface DogsContextType
  extends ReturnType<typeof useFetchDogs>,
    ReturnType<typeof useFetchBreeds>,
    ReturnType<typeof useFetchLocation> {}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { breeds, selectedBreeds, setSelectedBreeds } = useFetchBreeds();
  const {
    dogs,
    searchResultTotal,
    totalPages,
    currentPage,
    setCurrentPage,
    resultsPerPage,
    setResultsPerPage,
    favorites,
    setFavorites,
  } = useFetchDogs();

  const { location } = useFetchLocation();

  return (
    <DogsContext.Provider
      value={{
        breeds,
        selectedBreeds,
        setSelectedBreeds,

        dogs,
        searchResultTotal,
        totalPages,
        currentPage,
        setCurrentPage,
        resultsPerPage,
        setResultsPerPage,
        favorites,
        setFavorites,

        location,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
