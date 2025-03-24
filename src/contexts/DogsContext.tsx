import { ReactNode, createContext } from "react";
import { useFetchDogs } from "@/hooks/useFetchDogs";

interface DogsContextType {
  state: ReturnType<typeof useFetchDogs>["state"];
  dispatch: ReturnType<typeof useFetchDogs>["dispatch"];
}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { state, dispatch } = useFetchDogs();

  return (
    <DogsContext.Provider value={{ state, dispatch }}>
      {children}
    </DogsContext.Provider>
  );
};
