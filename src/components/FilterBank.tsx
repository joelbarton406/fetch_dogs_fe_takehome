import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filters } from "@/components/FiltersMenu";

import {
  FaDeleteLeft,
  FaDog,
  FaLocationDot,
  FaPaw,
//   FaTimeline,
} from "react-icons/fa6";

const iconMap = {
  ageMinMax: FaPaw,
  zipCodes: FaLocationDot,
  selectedBreeds: FaDog,
};

type FilterBankProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FilterBank = ({ filters, setFilters }: FilterBankProps) => {
  const activeFilterCount = Object.values(filters).reduce(
    (count, filter) => count + filter.length,
    -1
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="search filters">
        <AccordionTrigger className="w-full">
          Search Filters ({activeFilterCount})
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2 max-w-[700px]">
            {Object.keys(filters).map((filterType) => {
              const values = filters[filterType as keyof Filters];
              const Icon = iconMap[filterType as keyof Filters];

              if (values.length > 0) {
                if (filterType === "ageMinMax") {
                  return (
                    <div
                      key={`filter-${filterType}`}
                      className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm"
                    >
                      <Icon className="mr-2 text-gray-700" />
                      <span className="mr-2 text-gray-700 font-medium">
                        {values.join(" - ")}
                      </span>
                      <button
                        onClick={() => {
                          setFilters((prev) => {
                            return {
                              ...prev,
                              [filterType]: [0, 14],
                            };
                          });
                        }}
                        aria-label={`Remove ${filterType}`}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <FaDeleteLeft />
                      </button>
                    </div>
                  );
                }

                return values.map((value: string | number) => (
                  <div
                    key={`filter-${filterType}-${value}`}
                    className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm"
                  >
                    <Icon className="mr-2 text-gray-700" />
                    <span className="mr-2 text-gray-700 font-medium">
                      {value}
                    </span>
                    <button
                      onClick={() => {
                        setFilters((prev) => {
                          return {
                            ...prev,
                            [filterType]: (
                              prev[filterType as keyof Filters] as (
                                | string
                                | number
                              )[]
                            ).filter((v) => v !== value),
                          };
                        });
                      }}
                      aria-label={`Remove ${filterType} ${value}`}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <FaDeleteLeft />
                    </button>
                  </div>
                ))
              } else {
                return null;
              }
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterBank;
