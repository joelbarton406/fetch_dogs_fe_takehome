import BreedComboBox from "@/components/BreedComboBox";
import AgeSlider from "@/components/AgeSlider";
import DogLocationInput from "@/components/DogLocationInput";
import DogNameInput from "@/components/DogNameInput";
import FavoritesMatch from "@/components/FavoritesMatch";
import SortFieldRadio from "@/components/SortFieldRadio";
import SortDirectionToggle from "@/components/SortDirectionToggle";

import { Button } from "@/components/ui/button";

const UserInputMenu = () => {
  const handleSearchClick = () => {
    console.log("searching...");
  };
  return (
    <div
      id="dogs-search-filter-container"
      className="mt-4 bg-white shadow-lg rounded-xl p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
          <BreedComboBox />
        </div>
        <div className="col-span-1">
          <AgeSlider />
        </div>
        <div className="col-span-1">
          <DogLocationInput />
        </div>
        <div className="col-span-1">
          <DogNameInput />
        </div>
        {/* <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <SortFieldRadio />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-row justify-around mt-4">
          <SortDirectionToggle />
          <FavoritesMatch />
        </div> */}
      </div>
      <div className="flex justify-end mt-6">
        <Button
          className="bg-pink-600"
          //   variant="destructive"
          size="lg"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default UserInputMenu;
