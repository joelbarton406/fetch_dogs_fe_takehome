import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import PagesMenu from "./PagesMenu";
import DogCard from "./DogCard";
import { FaHeart } from "react-icons/fa6";

function Results() {
  const ctx = useContext(DogsContext);
  const queryClient = useQueryClient();

  const {
    data: dogDetails,
    isLoading,
    error,
  } = useQuery<Dog[], Error>(
    ["dogDetails", ctx?.dogs],
    async () => {
      if (!ctx?.dogs?.length) {
        return [];
      }

      const cachedDogs: Dog[] = [];
      const dogsToFetch: string[] = [];

      for (const id of ctx.dogs) {
        const cachedDog = queryClient.getQueryData<Dog>(["dog", id]);
        if (cachedDog) {
          cachedDogs.push(cachedDog);
        } else {
          dogsToFetch.push(id);
        }
      }

      if (dogsToFetch.length === 0) {
        return cachedDogs;
      }

      const results = await getDogs(dogsToFetch);
      const fetchedDogs = results.data;

      fetchedDogs.forEach((dog) => {
        queryClient.setQueryData(["dog", dog.id], dog);
      });

      return [...cachedDogs, ...fetchedDogs];
    },
    {
      enabled: !!ctx && !!ctx.dogs?.length,
      staleTime: 15 * 60 * 1000, // Consider data fresh for 15 minutes
      cacheTime: 15 * 60 * 1000, // Keep unused data in cache for 15 minutes
    }
  );

  if (!ctx) return <span>DogsContext failed</span>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching dog details: {error.message}</div>;

  return (
    <>
      <div className="relative inline-block">
        <FaHeart className="cursor-pointer text-4xl text-pink-600" />
        <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold">
          {ctx.favorites.size}
        </span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {dogDetails?.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </ul>
      <div>Total search results: {ctx.searchResultTotal}</div>
      <PagesMenu />
    </>
  );
}

export default Results;
