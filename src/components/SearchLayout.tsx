import { DogsProvider } from "@/contexts/DogsContext";
import UserInputMenu from "@/components/UserInputMenu";
import FilterItemsBank from "@/components/FilterItemsBank";
import Results from "@/components/Results";
import SearchCount from "@/components/SearchCount";
import PagesMenu from "@/components/PagesMenu";

const SearchLayout = () => {
  return (
    <DogsProvider>
      <div className="max-w-[920px]">
        <UserInputMenu />
        <FilterItemsBank />
        <Results />
        <SearchCount />
        <PagesMenu />
      </div>
    </DogsProvider>
  );
};

export default SearchLayout;
