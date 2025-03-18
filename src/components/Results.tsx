import { useContext } from "react";
import { useQuery } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import PagesMenu from "./PagesMenu";
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
    <>
      <div className="mt-3">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {dogsConsolidated?.map((dog) => (
            <DogCard key={dog.id} dog={dog} />
          ))}
        </ul>
      </div>
      <PagesMenu />
      {/* <span>search results: {formattedTotal}</span> */}
    </>
  );
}

export default Results;

//   const queryClient = useQueryClient();

//   const { data, isLoading, error } = useQuery<Dog[], Error>(
//     ["dogDetails", ctx?.dogs],
//     async () => {
//       if (!ctx?.dogs?.length) {
//         return [];
//       }

//       const cachedDogs: Dog[] = [];
//       const dogsToFetch: string[] = [];

//       for (const id of ctx.dogs) {
//         const cachedDog = queryClient.getQueryData<Dog>(["dog", id]);
//         if (cachedDog) {
//           cachedDogs.push(cachedDog);
//         } else {
//           dogsToFetch.push(id);
//         }
//       }

//       if (dogsToFetch.length === 0) {
//         return cachedDogs;
//       }

//       const fetchedDogs = await getDogs(dogsToFetch);

//       // Extract unique zip codes
//       const uniqueZipCodes = [
//         ...new Set(fetchedDogs.map((dog) => dog.zip_code)),
//       ];
//       console.log({ uniqueZipCodes });
//       let locationMap: Record<string, string> = {}; // Zip code -> Location mapping

//       if (uniqueZipCodes.length > 0) {
//         try {
//           const response = await fetchDogLocations(uniqueZipCodes);
//           locationMap = response.data;
//         } catch (error) {
//           console.error("Error fetching locations:", error);
//         }
//       }

//       console.log({ fetchedDogs });
//       const updatedDogs = fetchedDogs.map((dog) => ({
//         ...dog,
//         location: locationMap[dog.zip_code] || "Unknown",
//       }));

//       // Cache the updated dogs
//       updatedDogs.forEach((dog) => {
//         queryClient.setQueryData(["dog", dog.id], dog);
//       });

//       return [...cachedDogs, ...updatedDogs];
//     },
//     {
//       enabled: !!ctx && !!ctx.dogs?.length,
//       staleTime: 15 * 60 * 1000, // Consider data fresh for 15 minutes
//       cacheTime: 15 * 60 * 1000, // Keep unused data in cache for 15 minutes
//     }
//   );
