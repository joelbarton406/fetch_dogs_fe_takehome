import { useEffect, useState } from "react";
import { getBreeds } from "@/api/dogs";

export const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedData = await getBreeds();
        setBreeds(breedData);
        return breedData;
      } catch (error) {
        console.error("Error fetching breeds:", error);
        return [];
      }
    };
    fetchBreeds();
  }, []);

  return {
    breeds,
  };
};
