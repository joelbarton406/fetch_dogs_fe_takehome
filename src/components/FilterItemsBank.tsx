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
  const { filterTerms, removeFilterTerm } = ctx;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="search terms">
        <AccordionTrigger className="w-full">Search Terms</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 max-w-[700px]">
            {filterTerms.map((term) => (
              <div key={`${term.type}-${term.value}`} className="max-w-full">
                <FilterTerm term={term} removeFilterTerm={removeFilterTerm} />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterItemsBank;
