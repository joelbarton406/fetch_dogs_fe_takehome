import { useContext, memo, FC, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
import { FaHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonDogCard() {
  return (
    <div className="relative flex flex-col items-center text-white">
      <div className="relative w-72 h-72 overflow-hidden rounded-md">
        <Skeleton className="absolute inset-0 w-full h-full animate-pulse bg-gray-700 rounded-md" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2">
          <Skeleton className="h-8 w-32 rounded" />
          <div className="flex flex-col items-center text-md font-light">
            <Skeleton className="mt-2 h-4 w-24 rounded" />
            <Skeleton className="mt-2 h-4 w-28 rounded" />
            <Skeleton className="mt-2 h-4 w-32 rounded" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

interface DogCardProps {
  dog: Dog;
}

const DogCard: FC<DogCardProps> = ({ dog }) => {
  const { id, name, age, breed, img, location } = dog;

  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext is not available.");

  const { favorites, setFavorites } = ctx;
  const [isLoading, setIsLoading] = useState(true);

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
        {isLoading && <SkeletonDogCard />}

        <img
          src={img}
          alt={`${name}-${breed}-${age}`}
          className={`w-full h-full object-cover transition-opacity duration-500 group-hover:brightness-0 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
          onLoad={async () => {
            // await new Promise((resolve) => setTimeout(resolve, 5000));
            setIsLoading(false);
          }}
        />

        {!isLoading && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-4xl font-bold rounded">{name}</span>

              <div className="flex flex-col items-center text-md font-light opacity-65">
                <span>{breed}</span>
                {location && (
                  <span>
                    {location.city}, {location.state}
                  </span>
                )}
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
          </>
        )}
      </div>
    </li>
  );
};

export default memo(DogCard);
