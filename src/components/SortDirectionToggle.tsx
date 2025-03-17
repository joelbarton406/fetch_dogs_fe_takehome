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
    <div className="flex items-center space-x-2">
      <Switch
        id="sort-order-toggle"
        checked={sortDirection === "desc"}
        onCheckedChange={handleToggleDirection}
      />
      <label htmlFor="sort-order-toggle" className="text-sm font-medium">
        {sortDirection === "asc" ? "asc" : "desc"}
      </label>
    </div>
  );
}

export default SortDirectionToggle;
