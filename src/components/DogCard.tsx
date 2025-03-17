import { useContext, memo, FC, useEffect, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Dog } from "@/types/api";
// import getDistanceBetweenZipCodes from "@/utils/calculateDistance";
import { FaHeart, FaMapPin } from "react-icons/fa6";
import getDistanceBetweenZipCodes from "@/utils/calculateDistance";
// import { useQuery } from "react-query";
// const { data, isLoading } = useQuery(
//   ["locationData", zip_code, location.zip_code],
//   async () => {
//     if (zip_code && location.zip_code) {
//       console.log("hi");
//       const distance = await getDistanceBetweenZipCodes(
//         zip_code,
//         location.zip_code
//       );
//       const response = await fetch(`http://api.zippopotam.us/us/${zip_code}`);
//       const data = await response.json();

//       if (data && data.places && data.places[0]) {
//         return {
//           city: data.places[0]["place name"],
//           state: data.places[0]["state"],
//           stateCode: data.places[0]["state abbreviation"],
//           distance,
//         };
//       }
//       return null;
//     }
//     return null;
//   },
//   {
//     enabled: !!zip_code && !!location.zip_code,
//     staleTime: Infinity, // Distance and location info doesn't change
//     cacheTime: Infinity, // Keep cached forever
//     retry: false, // Don't retry on failure
//   }
// );
interface DogCardProps {
  dog: Dog;
}

const DogCard: FC<DogCardProps> = ({ dog }) => {
  const { id, name, age, breed, img, zip_code } = dog;
  const searchContext = useContext(DogsContext);
  if (!searchContext) throw new Error("DogsContext failed");
  const { favorites, setFavorites, location } = searchContext;
  const [distance, setDistance] = useState(0);
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    const ft = async () => {
      if (typeof zip_code === "string" && zip_code.trim() !== "") {
        try {
          const locRes = await fetch(`http://api.zippopotam.us/us/${zip_code}`);
          const locData = await locRes.json();
          setLocationData(locData);
          console.log(locData);
          if (location && location.zip_code) {
            const distRes = await getDistanceBetweenZipCodes(
              zip_code,
              location.zip_code
            );
            setDistance(distRes);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      } else {
        console.error("Invalid zip code");
      }
    };

    ft();
  }, [zip_code, location]);

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
          <span className="text-xl font-medium opacity-65">{breed}</span>
          <span className="text-lg font-medium opacity-65">
            {locationData?.places?.[0]?.["place name"]},{" "}
            {locationData?.places?.[0]?.state}
          </span>
          <span className="text-md font-medium text-green-500">{age} yo</span>
          <button
            className="absolute top-2 left-2 flex items-center gap-x-1 cursor-pointer hover:underline "
            onClick={() => {
              console.log(`show map location of ${name}`);
            }}
          >
            <FaMapPin size={24} />
            <span className="text-md font-light text-white">
              {distance.toFixed(0)} km away
            </span>
          </button>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <button
          onClick={() => {
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
            size={24}
            className={`cursor-pointer  ${
              favorites.has(id) ? "text-pink-600" : ""
            }`}
          />
        </button>
      </div>
    </li>
  );
};

export default memo(DogCard);
