import { useContext, useState } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

/* this doesn't actually work since there isn't a way to fetch dogs by name, I left it in because this would be a nice extended functionality */
export default function DogNameInput() {
  const [dogNameValue, setDogNameValue] = useState("");
  const MIN_NAME_LENGTH = 3;

  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  //   const { handleSearchedDogNamesChange } = ctx;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDogNameValue(event.target.value);
  };

  //   const handleSearchClick = () => {
  //     if (MIN_NAME_LENGTH <= dogNameValue.length) {
  //       handleSearchedDogNamesChange(dogNameValue);
  //       setDogNameValue("");
  //     }
  //   };

  return (
    <div className="relative w-full">
      <Input
        id="controlled-dog-name-input"
        type="text"
        value={dogNameValue}
        onChange={handleChange}
        placeholder="Dog name (non-functional)"
        className="w-full pr-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <FaSearch
        // onClick={handleSearchClick}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer transition  ${
          MIN_NAME_LENGTH <= dogNameValue.length
            ? "text-gray-500 hover:text-gray-700"
            : "text-gray-300 cursor-not-allowed"
        }`}
      />
    </div>
  );
}
