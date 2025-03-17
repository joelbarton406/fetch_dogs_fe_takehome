import { ReactNode, createContext } from "react";
import { useFetchDogs } from "@/hooks/useFetchDogs";
import { useFetchBreeds } from "@/hooks/useFetchBreeds";
import { useUserLocation } from "@/hooks/useUserLocation";

interface DogsContextType
  extends ReturnType<typeof useFetchDogs>,
    ReturnType<typeof useFetchBreeds>,
    ReturnType<typeof useUserLocation> {}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { breeds } = useFetchBreeds();
  const { location } = useUserLocation();
  const dogSearchData = useFetchDogs();

  return (
    <DogsContext.Provider
      value={{
        breeds,
        location,
        ...dogSearchData,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
