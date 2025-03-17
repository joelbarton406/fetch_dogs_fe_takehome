import { FaHeart } from "react-icons/fa6";
import BreedComboBox from "./BreedComboBox";
import SortDirectionToggle from "./SortDirectionToggle";
import SortFieldRadio from "./SortFieldRadio";
import { useContext } from "react";
import { DogsContext } from "@/contexts/DogsContext";

const UserInputMenu = () => {
  const ctx = useContext(DogsContext);
  if (!ctx) return <span>DogsContext failed</span>;

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 h-40 p-6 my-6">
      <BreedComboBox />

      <div className="flex flex-row">
        <SortFieldRadio />
        <SortDirectionToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"></div>
      {/* <FaHeart className="cursor-pointer text-4xl text-pink-600" />
      <span className="inset-0 flex items-center justify-center text-black text-sm font-semibold">
        {ctx.favorites.size}
      </span> */}
    </div>
  );
};

export default UserInputMenu;
