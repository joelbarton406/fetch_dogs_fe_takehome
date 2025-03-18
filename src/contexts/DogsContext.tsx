import { ReactNode, createContext } from "react";
import { useFetchDogs } from "@/hooks/useFetchDogs";
import { useFetchBreeds } from "@/hooks/useFetchBreeds";
// import { useUserLocation } from "@/hooks/useUserLocation";

interface DogsContextType
  extends ReturnType<typeof useFetchDogs>,
    //   ReturnType<typeof useUserLocation>,
    ReturnType<typeof useFetchBreeds> {}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { breeds } = useFetchBreeds();
  //   const { userLocation } = useUserLocation();

  const dogSearchData = useFetchDogs();

  return (
    <DogsContext.Provider
      value={{
        breeds,
        // userLocation,
        ...dogSearchData,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
