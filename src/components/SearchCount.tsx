import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";

function SearchCount() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { state } = ctx;
  const formattedTotal = state.searchResultTotal.toLocaleString();
  return (
    <div className="flex flex-col sm:flex-row justify-end items-center gap-4 p-2 rounded-md">
      <span className="text-gray-800 text-md font-normal">
        <span className="">{formattedTotal} Dogs Found</span>
      </span>
    </div>
  );
}

export default SearchCount;
