import { Slider } from "@/components/ui/slider";
import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";

function AgeSlider() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const { state, dispatch } = ctx;
  const { ageMinMax } = state;

  return (
    <div className="bg-white rounded-lg flex flex-col items-center text-gray-700">
      <div>
        <span className="mr-1">Age range</span>
        <span>
          ({ageMinMax[0]}...{ageMinMax[1]})
        </span>
      </div>

      <Slider
        value={ageMinMax}
        min={0}
        max={14}
        onValueChange={(values) =>
          dispatch({ type: "UPDATE_AGE_MIN_MAX", payload: values })
        }
        className="flex-grow"
      />
    </div>
  );
}

export default AgeSlider;
