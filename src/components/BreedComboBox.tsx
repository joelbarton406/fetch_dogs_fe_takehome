import { useState, useContext } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonWrapper } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DogsContext } from "@/contexts/DogsContext";
import { Filters } from "@/components/FiltersMenu";

type BreedComboBoxProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const BreedComboBox = ({ filters, setFilters }: BreedComboBoxProps) => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { state } = ctx;
  const [open, setOpen] = useState(false);

  const handleSelectBreed = (breed: string) => {
    const updatedBreeds = filters.selectedBreeds.includes(breed)
      ? filters.selectedBreeds.filter((b) => b !== breed)
      : [...filters.selectedBreeds, breed];
    setFilters((prev) => ({ ...prev, selectedBreeds: updatedBreeds }));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonWrapper
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between font-semibold"
        >
          Search dogs by breed
          <ChevronsUpDown />
        </ButtonWrapper>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search breeds..." className="h-9" />
          <CommandList>
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup>
              {state.breeds.map((breed) => (
                <CommandItem
                  className="flex flex-row justify-between"
                  key={breed}
                  value={breed}
                  onSelect={handleSelectBreed}
                >
                  {breed}
                  <Check
                    className={cn(
                      filters.selectedBreeds.includes(breed)
                        ? "visible"
                        : "invisible"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BreedComboBox;
