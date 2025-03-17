import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import PagesMenu from "./PagesMenu";
import DogCard from "./DogCard";

function SearchCount({ total }: { total: number }) {
  const formattedTotal = total.toLocaleString();
  return <span>search results: {formattedTotal}</span>;
}

function Result({ data }: { data: Dog[] | undefined }) {
  return (
    <div className="mt-3">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {Array.isArray(data) ? (
          data.map((dog) => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <span>No matches {"</3"}</span>
        )}
      </ul>
    </div>
  );
}

function Results() {
  const ctx = useContext(DogsContext);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Dog[], Error>(
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
      <SearchCount total={ctx.searchResultTotal} />
      <Result data={data} />
      <SearchCount total={ctx.searchResultTotal} />
      <PagesMenu />
    </>
  );
}

export default Results;
