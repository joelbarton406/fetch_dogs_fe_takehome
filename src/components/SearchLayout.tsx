import { DogsProvider } from "@/contexts/DogsContext";
import FiltersMenu from "@/components/FiltersMenu";
import { UserLocation } from "@/components/UserLocation";
import Results from "@/components/Results";

import PagesMenu from "@/components/PagesMenu";

import SortDirectionToggle from "@/components/SortDirectionToggle";
import SortFieldRadio from "@/components/SortFieldRadio";

const SearchLayout = () => {
  return (
    <DogsProvider>
      <div className="max-w-[920px]">
        <UserLocation />
        <FiltersMenu />
        <div className="flex flex-row justify-between font-semibold text-xl mt-2 bg-white shadow-lg rounded-xl px-6 py-2 ">
          <SortDirectionToggle />
          <SortFieldRadio />
        </div>
        <Results />
        <PagesMenu />
      </div>
    </DogsProvider>
  );
};

export default SearchLayout;
