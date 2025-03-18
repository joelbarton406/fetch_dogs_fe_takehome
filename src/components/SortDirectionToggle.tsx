import { Switch } from "@/components/ui/switch";
import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";

function SortDirectionToggle() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { setSortDirection, sortDirection, setCurrentPage } = ctx;

  const handleToggleDirection = () => {
    setSortDirection((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row space-x-4">
        <Switch
          id="sort-order-toggle"
          checked={sortDirection === "desc"}
          onCheckedChange={handleToggleDirection}
        />
      </div>
    </div>
  );
}

export default SortDirectionToggle;
