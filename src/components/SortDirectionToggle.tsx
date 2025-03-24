import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
import { Button } from "./ui/button";
import { FaSortAmountUpAlt, FaSortAmountDownAlt } from "react-icons/fa";

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
    <Button
      onClick={handleToggleDirection}
      variant="ghost"
      className="flex items-center"
    >
      <span className="mr-2">Sort </span>
      {sortDirection === "asc" ? (
        <FaSortAmountUpAlt className="mr-2" />
      ) : (
        <FaSortAmountDownAlt className="mr-2" />
      )}
      <span>{sortDirection}</span>
    </Button>
  );
}

export default SortDirectionToggle;
