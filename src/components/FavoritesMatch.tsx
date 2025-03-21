import { DogsContext } from "@/contexts/DogsContext";
import { useContext } from "react";
import AdoptionMatchModal from "@/components/AdoptionMatchModal";

function FavoritesMatch() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { favorites } = ctx;

  return (
    <div className="bg-white shadow-md rounded-lg py-6 px-5 my-8 flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm md:max-w-md">
      <span className="font-bold text-lg sm:text-xl mb-2">Favorites</span>
      <span className="font-extrabold text-5xl sm:text-6xl text-pink-600">{favorites.size}</span>
      {favorites.size > 0 && (
        <div className="mt-4 w-full">
          <AdoptionMatchModal />
        </div>
      )}
    </div>
  );
}

export default FavoritesMatch;
