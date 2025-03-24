import { useContext, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Input } from "@/components/ui/input";
import { FaCheck } from "react-icons/fa";
import { Filters } from "@/components/FiltersMenu";

type DogLocationInputProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function DogLocationInput({
  filters,
  setFilters,
}: DogLocationInputProps) {
  String([filters, setFilters]);
  const [newZip, setNewZip] = useState("");

  const [isValidZipCode, setIsValidZipCode] = useState(false);

  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewZip(value);
    setIsValidZipCode(/^\d{5}$/.test(value));
  };

  const handleAddZipCode = () => {
    setFilters((prev) => ({
      ...prev,
      zipCodes: [...prev.zipCodes, newZip],
    }));
    setNewZip("");
    setIsValidZipCode(false);
  };

  return (
    <div className="relative w-full">
      <Input
        id="controlled-location-input"
        type="text"
        value={newZip}
        onChange={handleChange}
        placeholder="ZIP code"
        className="w-full pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {isValidZipCode && (
        <div
          onClick={handleAddZipCode}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg transition text-green-600 hover:text-gray-700 flex items-center space-x-1"
        >
          <span>Add</span>
          <FaCheck />
        </div>
      )}
    </div>
  );
}
