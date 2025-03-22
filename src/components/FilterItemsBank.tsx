import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import FilterTerm from "@/components/FilterTerm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FilterItemsBank = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const { state, dispatch } = ctx;
  const { filterTerms } = state;

  const handleRemoveFilterTerm = (filterType: string, value: string) => {
    const type =
      filterType === "breed"
        ? "UPDATE_SELECTED_BREEDS"
        : "UPDATE_SELECTED_ZIPCODES";

    dispatch({
      type,
      payload: value,
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="search filters">
        <AccordionTrigger className="w-full">Search Filters</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 max-w-[700px]">
            {filterTerms.map((term) => (
              <div key={`${term.type}-${term.value}`} className="max-w-full">
                <FilterTerm
                  term={term}
                  removeFilterTerm={() =>
                    handleRemoveFilterTerm(term.type, term.value)
                  }
                />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterItemsBank;
