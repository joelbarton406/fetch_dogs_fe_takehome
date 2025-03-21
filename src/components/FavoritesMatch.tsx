import { getDogs, getMatch } from "@/api/dogs";
import { ButtonWrapper } from "@/components/ui/button";
import { DogsContext } from "@/contexts/DogsContext";
import DogCard from "@/components/DogCard";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function FavoritesMatch() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");
  const { adoptionMatch, setAdoptionMatch, favorites } = ctx;

  const [hover, setHover] = useState(false);

  const handleMatch = async (ids: string[]) => {
    const matchObject = await getMatch(ids);
    const [match] = await getDogs([matchObject.match]);
    setAdoptionMatch(match);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWrapper
          variant="outline"
          onClick={() => handleMatch(Array.from(favorites.keys()))}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={favorites.size === 0}
        >
          {hover && favorites.size > 0
            ? "Match"
            : `${favorites.size} Fav${favorites.size === 1 ? "" : "s"}`}
        </ButtonWrapper>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Your match</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {adoptionMatch && <DogCard dog={adoptionMatch} />}
        <DialogFooter>
          <ButtonWrapper
            onClick={() =>
              alert(
                `You adopted ${adoptionMatch?.name}, a ${adoptionMatch?.age} year old ${adoptionMatch?.breed}!`
              )
            }
          >
            Adopt!
          </ButtonWrapper>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FavoritesMatch;
