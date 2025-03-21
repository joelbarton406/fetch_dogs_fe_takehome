import { useContext } from "react";
import { useQuery } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";

import DogCard from "./DogCard";
import { fetchDogLocations } from "@/api/location";

function Results() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const {
    data: dogsConsolidated,
    isLoading,
    error,
  } = useQuery<Dog[], Error>(
    ["dogDetails", ctx?.dogs],
    async () => {
      if (!ctx?.dogs?.length) return [];

      const dogs = await getDogs(ctx.dogs);
      const zipCodes = Array.from(new Set(dogs.map((dog) => dog.zip_code)));
      const locations = await fetchDogLocations(zipCodes);

      return dogs.map((dog, index) => ({
        ...dog,
        location: locations[index],
      }));
    },
    {
      enabled: !!ctx && !!ctx.dogs?.length,
    }
  );

  if (isLoading) return <div>Loading Dogs...</div>;
  if (error) return <div>Error fetching Dogs: {error.message}</div>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center sm:justify-items-stretch">
      {dogsConsolidated?.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </ul>
  );
}

export default Results;
