import { useContext } from "react";
import { useQuery } from "react-query";
import { DogsContext } from "@/contexts/DogsContext";
import { getDogs } from "@/api/dogs";
import { Dog } from "@/types/api";

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
      <div>Search Component</div>
      <div>Total search results: {ctx.searchResultTotal}</div>
      <ul>
        {dogDetails?.map((dog) => (
          <li key={dog.id}>{dog.name}</li>
        ))}
      </ul>
    </>
  );
}

export default SearchResults;
