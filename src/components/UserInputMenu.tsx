import BreedComboBox from "./BreedComboBox";
import AgeSlider from "@/components/AgeSlider";
import SortDirectionToggle from "./SortDirectionToggle";
import SortFieldRadio from "./SortFieldRadio";
import { DogLocationInput } from "./DogLocationInput";
import { DogNameInput } from "./DogNameInput";

const UserInputMenu = () => {
  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <BreedComboBox />
          <DogLocationInput />
          <DogNameInput />
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
          <SortFieldRadio />
          <AgeSlider />
          <SortDirectionToggle />
        </div>
      </div>
    </div>
  );
};

export default UserInputMenu;
