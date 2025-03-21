import { useContext, useEffect, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

export default function DogLocationInput() {
  const [locationValue, setLocationValue] = useState("");
  const [isValidZipCode, setIsValidZipCode] = useState(false);
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { handleZipCodesChange } = ctx;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (isValidZipCode) {
      handleZipCodesChange(locationValue);
      setLocationValue("");
    }
  };

  useEffect(() => {
    setIsValidZipCode(/^\d{5}$/.test(locationValue));
  }, [locationValue]);

  return (
    <div className="relative w-full">
      <Input
        id="controlled-location-input"
        type="text"
        value={locationValue}
        onChange={handleChange}
        placeholder="ZIP code"
        className="w-full pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <FaSearch
        onClick={handleSearchClick}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer transition ${
          isValidZipCode
            ? "text-gray-500 hover:text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
      />
    </div>
  );
}
