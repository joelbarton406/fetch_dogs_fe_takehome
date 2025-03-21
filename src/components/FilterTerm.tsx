import { FaDeleteLeft, FaDog, FaLocationDot, FaPaw } from "react-icons/fa6";

function FilterTerm({
  term,
  removeFilterTerm,
}: {
  term: { type: string; value: string };
  removeFilterTerm: (type: string, value: string) => void;
}) {
  const getIcon = (type: string) => {
    switch (type) {
      case "breed":
        return <FaDog className="mr-2 text-gray-700" />;
      case "zipCode":
        return <FaLocationDot className="mr-2 text-gray-700" />;
      case "dogName":
        return <FaPaw className="mr-2 text-gray-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm">
      {getIcon(term.type)}
      <span className="mr-2 text-gray-700 font-medium">{term.value}</span>
      <button
        onClick={() => removeFilterTerm(term.type, term.value)}
        aria-label={`Remove ${term.type} ${term.value}`}
        className="text-gray-500 hover:text-red-500 transition-colors"
      >
        <FaDeleteLeft />
      </button>
    </div>
  );
}

export default FilterTerm;
