import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SortField } from "@/hooks/useFetchDogs";

const SortFieldRadio = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { state, dispatch } = ctx;

  return (
    <RadioGroup
      value={state.sortField}
      onValueChange={(field: SortField) => {
        dispatch({
          type: "UPDATE_SORT",
          payload: {
            field,
            direction: state.sortDirection,
          },
        });
        dispatch({ type: "UPDATE_CURRENT_PAGE", payload: 1 });
      }}
    >
      <div className="flex space-x-4">
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
      </div>
    </RadioGroup>
  );
};

export default SortFieldRadio;
