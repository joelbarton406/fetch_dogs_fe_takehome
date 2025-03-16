import React, { useContext, useEffect, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
import getDistanceBetweenZipCodes from "@/utils/calculateDistance";
import { FaHeart, FaLocationPin } from "react-icons/fa6";

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const { id, name, breed, img, zip_code } = dog;
  const searchContext = useContext(DogsContext);
  if (!searchContext) throw new Error("DogsContext failed");
  const { favorites, setFavorites, location } = searchContext;
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const calculateDistance = async () => {
      if (zip_code && location.zip_code) {
        const calculatedDistance = await getDistanceBetweenZipCodes(
          zip_code,
          location.zip_code
        );
        if (isMounted && calculatedDistance) {
          setDistance(calculatedDistance);
        }
      }
    };

    calculateDistance();
    return () => {
      isMounted = false;
    };
  }, [zip_code, location.zip_code]);

  return (
    <li className="relative flex flex-col items-center">
      <div className="relative w-72 h-72 overflow-hidden group">
        <img
          src={img}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-10"
          alt={`${name}-${breed}`}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute top-2 left-2">{name}</div>
          <span className="text-white font-semibold text-lg">
            <span className="text-md text-white font-thin">
              {distance !== null
                ? `${distance.toFixed(1)} km away`
                : "unknown distance"}
            </span>
          </span>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <button
          onClick={() => {
            console.log(
              `${!favorites.has(id) ? "favorited" : "unfavorited"} ${name}`
            );
            setFavorites((prevFavorites) => {
              const newFavorites = new Map(prevFavorites);
              if (newFavorites.has(id)) {
                newFavorites.delete(id);
              } else {
                newFavorites.set(id, true);
              }
              return newFavorites;
            });
          }}
        >
          <FaHeart
            className={`text-2xl ${
              favorites.has(id) ? "text-pink-600" : "text-white"
            } cursor-pointer `}
          />
        </button>
      </div>
    </li>
  );
};

export default DogCard;
