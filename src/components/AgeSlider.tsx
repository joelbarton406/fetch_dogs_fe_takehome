import { Slider } from "@/components/ui/slider";
import { Filters } from "@/components/FiltersMenu";

type AgeSliderProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

function AgeSlider({ filters, setFilters }: AgeSliderProps) {
  const handleAgeChange = (ageRange: number[]) => {
    setFilters((prev) => ({ ...prev, ageMinMax: ageRange }));
  };
  return (
    <div className="bg-white rounded-lg flex flex-col items-center text-gray-700">
      <div>
        <span className="mr-1">Age range</span>
        <span>
          ({filters.ageMinMax[0]} - {filters.ageMinMax[1]})
        </span>
      </div>

      <Slider
        value={filters.ageMinMax}
        min={0}
        max={14}
        onValueChange={handleAgeChange}
        className="flex-grow"
      />
    </div>
  );
}

export default AgeSlider;
