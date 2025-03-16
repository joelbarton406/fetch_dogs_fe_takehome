import { useContext } from "react";
import { useQuery } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import PagesMenu from "./PagesMenu";
import DogCard from "./DogCard";

function SearchResults() {
  const ctx = useContext(DogsContext);

  const {
    data: dogDetails,
    isLoading,
    error,
  } = useQuery<Dog[], Error>(
    ["dogDetails", ctx?.dogs],
    async () => {
      if (!ctx) {
        return [];
      }
      const results = await Promise.all(
        ctx.dogs.map(async (id) => {
          const res = await getDogs([id]);
          return res.data;
        })
      );
      return results.flat();
    },
    {
      enabled: !!ctx,
    }
  );

  if (!ctx) return <span>DogsContext failed</span>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching dog details: {error.message}</div>;

  return (
    <>
      <div>Total search results: {ctx.searchResultTotal}</div>
      <h4 className="font-bold text-2xl text-pink-600">
        Favorites ({ctx.favorites.size})
      </h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {dogDetails?.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </ul>
      <PagesMenu />
    </>
  );
}

export default SearchResults;
