import BreedComboBox from "./BreedComboBox";
import AgeSlider from "@/components/AgeSlider";
import SortDirectionToggle from "./SortDirectionToggle";
import SortFieldRadio from "./SortFieldRadio";
import DogLocationInput from "@/components/DogLocationInput";
import DogNameInput from "@/components/DogNameInput";
import FavoritesMatch from "@/components/FavoritesMatch";

const UserInputMenu = () => {
  return (
    <div className="mt-4">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <BreedComboBox />
          <DogLocationInput />
          <DogNameInput />
          <AgeSlider />
          <SortFieldRadio />
          <div className="flex flex-row justify-between mt-4">
            <SortDirectionToggle />
            <FavoritesMatch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInputMenu;
