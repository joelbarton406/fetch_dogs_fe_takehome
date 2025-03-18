import { FaSearch } from "react-icons/fa";

import { SetStateAction, useContext, useEffect, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import BreedComboBox from "./BreedComboBox";
import AgeSlider from "@/components/AgeSlider";
import { Input } from "@/components/ui/input";

function DogLocationInput() {
  const [locationValue, setLocationValue] = useState("");
  const [isValidZipCode, setIsValidZipCode] = useState(false);
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { zipCodes, setZipCodes } = ctx;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (isValidZipCode) {
      console.log("Search clicked with value:", locationValue);
      setZipCodes((prevZipCodes) => {
        const newZipCodes = [...prevZipCodes, locationValue];
        return newZipCodes;
      });
    }
  };

  useEffect(() => {
    setIsValidZipCode(/^\d{5}$/.test(locationValue));
  }, [locationValue]);

  return (
    <div className="relative">
      <Input
        id="controlled-location-input"
        type="text"
        value={locationValue}
        onChange={handleChange}
        placeholder="zip code (ex: 94117)"
        className="block w-full pr-10"
      />
      <FaSearch
        onClick={isValidZipCode ? handleSearchClick : undefined} // Disable if invalid
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
          isValidZipCode
            ? "text-gray-500 hover:text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
      />
    </div>
  );
}

function DogNameInput() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Input
        id="controlled-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="dog name"
        className="block w-full"
      />
    </div>
  );
}

const UserInputMenu = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  <span>DogsContext failed</span>;
  const formattedTotal = ctx?.searchResultTotal.toLocaleString();

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-3 my-3">
      <div className="flex flex-row items-center gap-4">
        <BreedComboBox />
        <DogLocationInput />
        <DogNameInput />
      </div>
      <AgeSlider />
      {/* <span>search results: {formattedTotal}</span> */}
    </div>
  );
};

export default UserInputMenu;
{
  /* <FaHeart className="cursor-pointer text-4xl text-pink-600" />
      <span className="inset-0 flex items-center justify-center text-black text-sm font-semibold">
        {ctx.favorites.size}
      </span> */
}
