import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SortField } from "@/hooks/useFetchDogs";

const SortFieldRadio = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { sortField, setSortField, setCurrentPage } = ctx;

  return (
    <div className="ml-3">
        <RadioGroup
      value={sortField}
      onValueChange={(value) => {
        setSortField(value as SortField);
        setCurrentPage(1);
      }}
    >
      <div className="flex items-center">
        <RadioGroupItem value="breed" id="r1" />
        <Label htmlFor="r1" className="ml-2">
          Breed
        </Label>
      </div>

      <div className="flex items-center">
        <RadioGroupItem value="name" id="r2" />
        <Label htmlFor="r2" className="ml-2">
          Name
        </Label>
      </div>

      <div className="flex items-center">
        <RadioGroupItem value="age" id="r3" />
        <Label htmlFor="r3" className="ml-2">
          Age
        </Label>
      </div>
    </RadioGroup>
    </div>
  );
};

export default SortFieldRadio;
