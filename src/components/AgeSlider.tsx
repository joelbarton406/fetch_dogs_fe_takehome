import { Slider } from "@/components/ui/slider";
import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";

function AgeSlider() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  <div>DogContext Failed</div>;
  const { ageMinMax, setAgeMinMax } = ctx;

  return (
    <div className="bg-white rounded-lg flex items-center ml-4 mr-1 mt-2">
      <span className="font-semibold text-gray-700 mr-4">{ageMinMax[0]}</span>
      <Slider
        value={ageMinMax}
        min={0}
        max={14}
        onValueChange={(values) => setAgeMinMax(values)}
        className="flex-grow"
      />
      <span className="font-semibold text-gray-700 ml-2">{ageMinMax[1]}</span>
    </div>
  );
}

export default AgeSlider;
