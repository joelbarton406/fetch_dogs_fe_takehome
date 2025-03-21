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
    <Accordion type="single" collapsible className="flex flex-wrap gap-2 p-2">
      <AccordionItem value="search terms">
        <AccordionTrigger>Search Terms</AccordionTrigger>
        <AccordionContent>
          {filterTerms.map((term) => (
            <FilterTerm term={term} removeFilterTerm={removeFilterTerm} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterItemsBank;
