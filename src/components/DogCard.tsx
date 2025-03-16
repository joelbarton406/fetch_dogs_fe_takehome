import React, { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
import { FaHeart } from "react-icons/fa6";

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const ctx = useContext(DogsContext);
  if (!ctx) return <span>DogsContext failed</span>;
  const { favorites, setFavorites } = ctx;

  const { id, name, breed, zip_code, img } = dog;

  return (
    <li className="relative flex flex-col items-center">
      <div className="relative w-72 h-72">
        <img
          src={img}
          className="w-full h-full object-cover"
          alt={`${name}-${breed}`}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-50 transition duration-300 bg-black bg-opacity-50">
          <span className="text-white font-semibold text-lg">{name}</span>
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-50 transition duration-300 bg-black bg-opacity-50">
        </div> */}
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
            } cursor-pointer`}
          />
        </button>
      </div>
    </li>
  );
};

export default DogCard;
