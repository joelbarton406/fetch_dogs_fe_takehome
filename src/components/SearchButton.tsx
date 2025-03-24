import { Button } from "@/components/ui/button";
export default function SearchButton({
  handleSearchClick,
}: {
  handleSearchClick: () => void;
}) {
  return (
    <>
      <Button className="bg-sky-600" size="lg" onClick={handleSearchClick}>
        Search
      </Button>
    </>
  );
}
