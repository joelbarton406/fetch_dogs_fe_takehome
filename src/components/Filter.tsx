import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";
function Filter() {
  const ctx = useContext(DogsContext);

  if (!ctx) return <span>DogsContext failed</span>;

  return (
    <>
      <h5>Filter Component</h5>
      {JSON.stringify(ctx.breeds)}
    </>
  );
}

export default Filter;
