import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Button } from "./ui/button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function SortDirectionToggle() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { setSortDirection, sortDirection, setCurrentPage } = ctx;

  const handleToggleDirection = () => {
    setSortDirection((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  return (
    <>
      <Button className="" onClick={handleToggleDirection} variant="default">
        Sort {sortDirection === "asc" ? <FaChevronUp /> : <FaChevronDown />}
      </Button>
    </>
  );
}

export default SortDirectionToggle;
