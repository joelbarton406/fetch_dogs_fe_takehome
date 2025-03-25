import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { FaLocationDot } from "react-icons/fa6";

export function UserLocation() {
  const ctx = useContext(DogsContext);
  if (!ctx) {
    throw new Error("useDogsContext must be used within a DogsProvider");
  }
  const { userLocation } = ctx.state;
  if (!userLocation) {
    return (
      <div className="p-4 border rounded-md bg-gray-100 text-center text-gray-700">
        Loading Current Location...
      </div>
    );
  }

  const { city, state, zip_code } = userLocation;
  return (
    <div
      id="user-location-container"
      className="mt-2 bg-white shadow-lg rounded-xl p-4 text-center"
    >
      <div className="flex items-center justify-center space-x-2">
        <FaLocationDot className="text-pink-600 text-xl" />
        <h2 className="text-md font-semibold text-gray-800">
          {city}, {state}, {zip_code}
        </h2>
      </div>
    </div>
  );
}
