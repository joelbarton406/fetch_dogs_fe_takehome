import React, { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
import getDistanceBetweenZipCodes from "@/utils/calculateDistance";
import { FaHeart, FaMapLocationDot } from "react-icons/fa6";
// import { MdTimer } from "react-icons/md";
// import { PiDogLight } from "react-icons/pi";
interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const searchContext = useContext(DogsContext);
  if (!searchContext) return <span>DogsContext failed</span>;
  const { favorites, setFavorites, location } = searchContext;
  const { id, name, breed, img, zip_code } = dog;

  let distance;
  if (zip_code && location.zip_code) {
    distance = getDistanceBetweenZipCodes(zip_code, location.zip_code);
  }

  return (
    <li className="relative flex flex-col items-center">
      {/* Group for hover effects */}
      <div className="relative w-72 h-72 overflow-hidden group">
        {/* Image */}
        <img
          src={img}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-10"
          alt={`${name}-${breed}`}
        />

        {/* Overlay Text (Initially hidden, appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute top-2 left-2">
            <span className="text-lg text-white font-semibold">
              {distance} km away
              {/* {} miles away */}
            </span>
          </div>
          <span className="text-white font-semibold text-lg">{name}</span>
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
            className={`text-3xl ${
              favorites.has(id) ? "text-pink-600" : "text-white"
            } cursor-pointer `}
          />
        </button>
      </div>
    </li>
  );
};

export default DogCard;
