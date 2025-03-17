import { useContext, memo, FC } from "react";
import { DogsContext } from "@/contexts/DogsContext";
// import { useLocationData } from "@/hooks/useLocationData";
import { Dog } from "@/types/api";
import { FaHeart } from "react-icons/fa6";

interface DogCardProps {
  dog: Dog;
}

const DogCard: FC<DogCardProps> = ({ dog }) => {
  const { id, name, age, breed, img, zip_code } = dog;

  const searchContext = useContext(DogsContext);
  if (!searchContext) {
    throw new Error("DogsContext is not available.");
  }

  const { favorites, setFavorites, location } = searchContext;
//   const userLocationZip = location?.zip_code;

//   const { data, isLoading, error } = useLocationData(zip_code, userLocationZip);
//   if (!data) return <li>Error</li>;

  const handleToggleFavorite = () => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Map(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.set(id, true);
      }
      return newFavorites;
    });
  };

//   if (isLoading) {
//     return <li>Loading data...</li>;
//   }
//   if (error) {
//     return <li>Error: {error.message}</li>;
//   }

  return (
    <li className="relative flex flex-col items-center text-white">
      <div className="relative w-72 h-72 overflow-hidden group">
        <img
          src={img}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-0"
          alt={`${name}-${breed}-${age}`}
          loading="lazy"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 font-semibold gap-y-2">
          <span className="font-bold text-4xl border-y-2 rounded">{name}</span>
          <div className="flex flex-col items-center text-md font-light opacity-65">
            <span>{breed}</span>
            <span>
              {/* {data.city}, {data.state} */} nowhere
            </span>
            <span>{age} years old</span>
          </div>
          <button
            className="absolute top-2 left-2 flex items-center gap-x-1 cursor-pointer hover:underline "
            onClick={() => {
              console.log(`show map location of ${name}`);
            }}
          >
            <span className="text-md font-light text-white">
              {/* {data.distance?.toFixed(1)} km away */} far away
            </span>
          </button>
          <button
            className="absolute top-2 right-2"
            onClick={handleToggleFavorite}
          >
            <FaHeart
              size={24}
              className={`cursor-pointer  ${
                favorites.has(id) ? "text-pink-600" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </li>
  );
};

export default memo(DogCard);
