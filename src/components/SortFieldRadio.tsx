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
    <RadioGroup
      value={sortField}
      onValueChange={(value) => {
        setSortField(value as SortField);
        setCurrentPage(1);
      }}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="breed" id="r1" />
        <Label htmlFor="r1">Breed</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="name" id="r2" />
        <Label htmlFor="r2">Name</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="age" id="r3" />
        <Label htmlFor="r3">Age</Label>
      </div>
    </RadioGroup>
  );
};

export default SortFieldRadio;
