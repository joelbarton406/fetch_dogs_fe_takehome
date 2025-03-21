import { DogsContext } from "@/contexts/DogsContext";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { useContext } from "react";

function SearchTermsAccordian() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { searchTerms } = ctx;
  return (
    <Accordion type="single" collapsible className="w-full">
      {searchTerms.map( => (
        <AccordionItem key={idx} value={`item-${idx}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default SearchTermsAccordian;
