import { useEffect, useState } from "react";
import { getBreeds } from "@/api/dogs";

export const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreeds();
        setBreeds(response.data);
        return response.data;
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
