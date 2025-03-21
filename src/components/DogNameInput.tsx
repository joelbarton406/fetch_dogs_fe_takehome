import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";

export function DogNameInput() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="w-full">
      <Input
        id="controlled-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search by dog name"
        className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
