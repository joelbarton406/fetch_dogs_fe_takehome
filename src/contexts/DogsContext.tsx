import { ReactNode, createContext, useEffect, useState } from "react";
import { getBreeds, searchDogs } from "@/api/dogs";

interface DogsContextType {
  breeds: string[];
  dogs: string[];
  searchResultTotal: number;
  //   loading: boolean;
}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //   const [loading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<string[]>([]);
  const [searchResultTotal, setSearchResultTotal] = useState(0);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreeds();
        console.log(response.data);
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    const fetchDogs = async () => {
      try {
        const response = await searchDogs({
          sort: "breed:asc",
          //   zipCodes: ["59715"],
          breeds: ["Irish Wolfhound"],
          //   ageMin: 1,
          ageMax: 2,
        });

        const { resultIds, total } = response.data;

        setDogs(resultIds);
        setSearchResultTotal(total);
      } catch (error: unknown) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchBreeds(), fetchDogs()]);
      //   setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <DogsContext.Provider value={{ breeds, dogs, searchResultTotal }}>
      {children}
    </DogsContext.Provider>
  );
};
