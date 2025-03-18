import { useState, useContext } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const BreedComboBox = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { breeds, selectedBreeds, setSelectedBreeds, setCurrentPage } = ctx;

  const [open, setOpen] = useState(false);

  const toggleBreedSelection = (breed: string) => {
    setSelectedBreeds((prevSelectedBreeds) =>
      prevSelectedBreeds.includes(breed)
        ? prevSelectedBreeds.filter((b) => b !== breed)
        : [...prevSelectedBreeds, breed]
    );
    setCurrentPage(1);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="justify-between font-semibold"
        >
          Search dogs by breed
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] h-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search breeds..." className="h-9" />
          <CommandList>
            <CommandEmpty>No breed found.</CommandEmpty>
            <CommandGroup>
              {breeds.map((breed) => (
                <CommandItem
                  className="flex flex-row justify-between"
                  key={breed}
                  value={breed}
                  onSelect={() => {
                    toggleBreedSelection(breed);
                  }}
                >
                  {breed}
                  <Check
                    className={cn(
                      selectedBreeds.includes(breed)
                        ? "opacity-100"
                        : "opacity-0"
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
