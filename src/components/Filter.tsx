import { useContext, useState, useEffect } from "react";
import { DogsContext } from "@/contexts/DogsContext";
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

function Filter() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { breeds, selectedBreeds, setSelectedBreeds } = ctx;

  const [open, setOpen] = useState(false);
  const [tempSelectedBreeds, setTempSelectedBreeds] =
    useState<string[]>(selectedBreeds);

  useEffect(() => {
    if (!open) {
      setSelectedBreeds(tempSelectedBreeds);
    }
  }, [open, setSelectedBreeds, tempSelectedBreeds]);

  const toggleTempBreedSelection = (breed: string) => {
    setTempSelectedBreeds((prevTempSelectedBreeds) =>
      prevTempSelectedBreeds.includes(breed)
        ? prevTempSelectedBreeds.filter((b) => b !== breed)
        : [...prevTempSelectedBreeds, breed]
    );
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-[240px] justify-between font-semibold"
          >
            Filter by breed
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
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
                      toggleTempBreedSelection(breed);
                    }}
                  >
                    {breed}
                    <Check
                      className={cn(
                        tempSelectedBreeds.includes(breed)
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
    </>
  );
}

export default Filter;
