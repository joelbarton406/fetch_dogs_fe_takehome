import { useContext, memo, FC, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
import { FaHeart } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDogCard() {
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
  handleCalculateDistance: (
    userZipCode: string,
    dogZipCode: string
  ) => Promise<number | null>;
}

export const DogCard: FC<DogCardProps> = memo(
  ({ dog, handleCalculateDistance }) => {
    const { id, name, age, breed, img, location, zip_code } = dog;

    const ctx = useContext(DogsContext);
    if (!ctx) throw new Error("DogsContext is not available.");

    const { state, dispatch } = ctx;
    const { favorites, userLocation } = state;

    const [distance, setDistance] = useState<number | null>(null);
    const [isDistanceButtonClicked, setIsDistanceButtonClicked] =
      useState(false);

    const handleToggleFavorite = () => {
      dispatch({ type: "TOGGLE_FAVORITE", payload: id });
    };

    const handleDistanceClick = async () => {
      if (userLocation && userLocation.zip_code) {
        const calculatedDistance = await handleCalculateDistance(
          userLocation.zip_code,
          zip_code
        );
        setDistance(calculatedDistance);
        setIsDistanceButtonClicked(true);
      }
    };

    return (
      <li className="relative flex flex-col items-center text-white">
        <div className="relative w-72 h-72 overflow-hidden group rounded-md">
          <img
            src={img}
            alt={`${name}-${breed}-${age}`}
            className={`w-full h-full object-cover transition-opacity duration-500 group-hover:brightness-0`}
            loading="lazy"
          />

          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-4xl font-bold rounded">{name}</span>

              <div className="flex flex-col items-center text-md font-light opacity-65">
                <span>{breed}</span>
                {location ? (
                  <span>
                    {location.city}, {location.state}
                  </span>
                ) : (
                  <span>Location unknown</span>
                )}
                <span>{age} years old</span>
              </div>
            </div>

            <div className="absolute top-2 left-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                className="text-md font-semibold text-white"
                variant="ghost"
                onClick={handleDistanceClick}
                disabled={isDistanceButtonClicked}
              >
                <span>
                  {distance !== null ? (
                    <span>{distance} miles away</span>
                  ) : (
                    <span>Calculate Distance</span>
                  )}
                </span>
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
        </div>
      </li>
    );
  }
);
