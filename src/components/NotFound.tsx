import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Oops! The page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <button
        onClick={handleGoBack}
        className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
      >
        Get back to looking at dogs!
      </button>
    </div>
  );
};

export default NotFound;
