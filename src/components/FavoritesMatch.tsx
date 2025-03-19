import { DogsContext } from "@/contexts/DogsContext";
import { useContext } from "react";
import AdoptionMatchModal from "@/components/AdoptionMatchModal";

function FavoritesMatch() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { favorites } = ctx;

  return (
    <div className="bg-white shadow-md rounded-md py-6 px-4 my-8 flex flex-col items-center  ">
      <span className="font-bold text-lg mb-2">Favorites</span>
      <span className="font-bold text-6xl text-pink-600">{favorites.size}</span>
      {favorites.size > 0 && <AdoptionMatchModal />}
    </div>
  );
}

export default FavoritesMatch;
