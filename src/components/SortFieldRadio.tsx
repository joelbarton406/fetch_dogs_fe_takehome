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
    <div className="">
      <RadioGroup
        //   orientation={"vertical"}
        value={sortField}
        onValueChange={(value) => {
          setSortField(value as SortField);
          setCurrentPage(1);
        }}
      >
        <RadioGroupItem value="breed" id="r1" />
        <Label htmlFor="r1">Breed</Label>

        <RadioGroupItem value="name" id="r2" />
        <Label htmlFor="r2">Name</Label>

        <RadioGroupItem value="age" id="r3" />
        <Label htmlFor="r3">Age</Label>
      </RadioGroup>
    </div>
  );
};

export default SortFieldRadio;
