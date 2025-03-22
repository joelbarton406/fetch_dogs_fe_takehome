import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Button } from "./ui/button";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function SortDirectionToggle() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { state, dispatch } = ctx;
  const sortDirection = state.sortDirection;

  const handleToggleDirection = () => {
    dispatch({
      type: "UPDATE_SORT",
      payload: {
        field: state.sortField,
        direction: sortDirection === "asc" ? "desc" : "asc",
      },
    });
  };

  return (
    <Button onClick={handleToggleDirection} variant="default">
      Sort {state.sortDirection === "asc" ? <FaChevronUp /> : <FaChevronDown />}
    </Button>
  );
}

export default SortDirectionToggle;
