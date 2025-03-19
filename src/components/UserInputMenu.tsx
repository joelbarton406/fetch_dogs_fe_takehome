import { SetStateAction, useContext, useEffect, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import BreedComboBox from "./BreedComboBox";
import AgeSlider from "@/components/AgeSlider";
import SortDirectionToggle from "./SortDirectionToggle";
import SortFieldRadio from "./SortFieldRadio";
import FavoritesMatch from "@/components/FavoritesMatch";

function DogLocationInput() {
  const [locationValue, setLocationValue] = useState("");
  const [isValidZipCode, setIsValidZipCode] = useState(false);
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { setZipCodes } = ctx;

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
        onClick={() => handleSearchClick()}
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
  const formattedTotal = ctx?.searchResultTotal.toLocaleString();
  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="bg-white shadow-md rounded-md py-6 px-4 my-8 flex flex-col">
          <div className="flex flex-row items-center gap-4 mb-6">
            <BreedComboBox />
            <DogLocationInput />
            <DogNameInput />
          </div>
          <div className="flex flex-row items-center align-middle justify-between gap-4">
            <SortFieldRadio />
            <AgeSlider />
            <SortDirectionToggle />
          </div>
        </div>
        <FavoritesMatch />
      </div>
      <span>search results: {formattedTotal}</span>
    </>
  );
};

export default UserInputMenu;
