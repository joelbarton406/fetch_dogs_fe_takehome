import { useContext } from "react";
import { useQuery } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";

import { fetchDogLocations } from "@/api/location";
import { calculateDistance } from "@/utils/calculateDistance";

import { DogCard, SkeletonDogCard } from "@/components/DogCard";

export default function Results() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const { state } = ctx;

  const {
    data: dogsConsolidated,
    isLoading,
    error,
  } = useQuery<Dog[], Error>(
    ["dogDetails", state.dogs],
    async () => {
      if (!state.dogs.length) return [];

      const dogs = await getDogs(state.dogs);
      const zipCodes = Array.from(new Set(dogs.map((dog) => dog.zip_code)));
      const locations = await fetchDogLocations(zipCodes);
      const locationMap = Object.fromEntries(
        locations.map((loc) => [loc.zip_code, loc])
      );

      return dogs.map((dog) => ({
        ...dog,
        location: locationMap[dog.zip_code],
      }));
    },
    {
      enabled: !!state.dogs.length,
    }
  );

  if (error) return <div>Error fetching Dogs: {error.message}</div>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center sm:justify-items-stretch mt-2">
      {isLoading
        ? Array(21)
            .fill(null)
            .map((_, index) => <SkeletonDogCard key={`${index}-skeleton`} />)
        : dogsConsolidated?.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              handleCalculateDistance={calculateDistance}
            />
          ))}
    </ul>
  );
}
