import { ReactNode, createContext } from "react";
import { useFetchDogs } from "@/hooks/useFetchDogs";
import { useFetchBreeds } from "@/hooks/useFetchBreeds";

interface DogsContextType {
  state: ReturnType<typeof useFetchDogs>["state"];
  dispatch: ReturnType<typeof useFetchDogs>["dispatch"];
  breeds: string[];
}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state, dispatch } = useFetchDogs();
  const { breeds } = useFetchBreeds();

  return (
    <DogsContext.Provider value={{ state, dispatch, breeds }}>
      {children}
    </DogsContext.Provider>
  );
};
