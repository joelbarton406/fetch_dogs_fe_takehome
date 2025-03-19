import { getDogs, getMatch } from "@/api/dogs";
import { Button } from "@/components/ui/button";
import { DogsContext } from "@/contexts/DogsContext";
import DogCard from "@/components/DogCard";
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AdoptionMatchModal() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { adoptionMatch, setAdoptionMatch, favorites } = ctx;

  const handleMatch = async (ids: string[]) => {
    const matchObject = await getMatch(ids);
    const [match] = await getDogs([matchObject.match]);
    setAdoptionMatch(match);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => handleMatch(Array.from(favorites.keys()))}
        >
          Match!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Your match </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {adoptionMatch && <DogCard dog={adoptionMatch} />}
        <DialogFooter>
          <Button>Adopt!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default AdoptionMatchModal;
