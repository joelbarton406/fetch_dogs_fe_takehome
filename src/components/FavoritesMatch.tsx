import { getDogs, getMatch } from "@/api/dogs";
import { ButtonWrapper } from "@/components/ui/button";
import { DogsContext } from "@/contexts/DogsContext";
import { DogCard } from "@/components/DogCard";
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
import { calculateDistance } from "@/utils/calculateDistance";

function FavoritesMatch() {
  const [hover, setHover] = useState(false);
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error("DogsContext failed");

  const { state, dispatch } = ctx;
  const { adoptionMatch, favorites } = state;

  const handleMatch = async (ids: string[]) => {
    if (ids.length === 0) return;

    try {
      const matchObject = await getMatch(ids);
      const [match] = await getDogs([matchObject.match]);

      dispatch({ type: "SET_ADOPTION_MATCH", payload: match });
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {favorites.size > 0 && (
          <ButtonWrapper
            variant="outline"
            onClick={() => handleMatch(Array.from(favorites.keys()))}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            size="lg"
          >
            {hover && favorites.size > 0
              ? "Get Match"
              : `${favorites.size} Favorite${favorites.size === 1 ? "" : "s"}`}
          </ButtonWrapper>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Your match</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {adoptionMatch && (
          <DogCard
            key={adoptionMatch.id}
            dog={adoptionMatch}
            handleCalculateDistance={calculateDistance}
          />
        )}
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
