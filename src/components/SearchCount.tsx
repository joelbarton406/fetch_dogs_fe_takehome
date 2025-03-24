import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";

function SearchCount() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { state } = ctx;
  const formattedTotal = state.searchResultTotal.toLocaleString();
  return (
    <span className="flex items-center text-sky-600">
      {formattedTotal} doggos
    </span>
  );
}

export default SearchCount;
