import { useContext, memo, FC } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
import { FaHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

interface DogCardProps {
  dog: Dog;
}

const DogCard: FC<DogCardProps> = ({ dog }) => {
  const { id, name, age, breed, img, location } = dog;

  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext is not available.");

  const { favorites, setFavorites } = ctx;

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

  return (
    <li className="relative flex flex-col items-center text-white">
      <div className="relative w-72 h-72 overflow-hidden group rounded-md">
        <img
          src={img}
          alt={`${name}-${breed}-${age}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-0"
          loading="lazy"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 gap-y-2">
          <span className="text-4xl font-bold border-y-2 rounded">{name}</span>

          <div className="flex flex-col items-center text-md font-light opacity-65">
            <span>{breed}</span>
            <span>
              {location?.city}, {location?.state}
            </span>
            <span>{age} years old</span>
          </div>
        </div>

        <div className="absolute top-2 left-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            className="text-md font-semibold text-white"
            variant="ghost"
            onClick={() => console.log(`Show map location of ${name}`)}
          >
            <span>X miles away</span>
          </Button>
        </div>

        <Button
          className="absolute top-2 right-2"
          variant="ghost"
          onClick={handleToggleFavorite}
        >
          <FaHeart
            className={`cursor-pointer ${
              favorites.has(id) ? "text-pink-600" : ""
            }`}
          />
        </Button>
      </div>
    </li>
  );
};

export default memo(DogCard);
