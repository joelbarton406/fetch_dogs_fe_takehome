import { ReactNode, createContext, useEffect, useState } from "react";
import { setDefaults, fromLatLng, OutputFormat } from "react-geocode";
import { getBreeds, searchDogs } from "@/api/dogs";

type Favorites = Map<string, boolean>;
interface CurrentLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
}

interface DogsContextType {
  breeds: string[];
  dogs: string[];
  searchResultTotal: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  resultsPerPage: number;
  setResultsPerPage: React.Dispatch<React.SetStateAction<number>>;

  favorites: Favorites;
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>;

  location: CurrentLocation;
}

export const DogsContext = createContext<DogsContextType | undefined>(
  undefined
);

export const DogsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<string[]>([]);
  const [searchResultTotal, setSearchResultTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState<Map<string, boolean>>(new Map());

  const [location, setLocation] = useState<CurrentLocation>({
    latitude: null,
    longitude: null,
    error: null,
    city: null,
    state: null,
    zip_code: null,
  });

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreeds();
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    const fetchDogs = async () => {
      try {
        const from = (currentPage - 1) * resultsPerPage;

        const response = await searchDogs({
          sort: "breed:asc",
          size: resultsPerPage,
          from: from.toString(),
          breeds: ["German Shepherd"],
        });

        const { resultIds, total } = response.data;

        setDogs(resultIds);
        setSearchResultTotal(total);
        setTotalPages(Math.ceil(total / resultsPerPage));
      } catch (error: unknown) {
        console.log(error);
      }
    };

    const fetchLocationData = async (latitude: number, longitude: number) => {
      try {
        const response = await fromLatLng(latitude, longitude);
        const addressComponents = response.results[0].address_components;
        const city = addressComponents.find((component) =>
          component.types.includes("locality")
        )?.long_name;
        const state = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;
        const zip_code = addressComponents.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        setLocation((prevState) => ({
          ...prevState,
          city: city || null,
          state: state || null,
          zip_code: zip_code || null,
        }));
      } catch (error) {
        setLocation((prevState) => ({
          ...prevState,
          error: error.message,
        }));
      }
    };

    const getCurrentPosition = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation((prevState) => ({
              ...prevState,
              latitude,
              longitude,
              error: null,
            }));
            await fetchLocationData(latitude, longitude);
          },
          (error) => {
            setLocation({
              latitude: null,
              longitude: null,
              city: null,
              state: null,
              zip_code: null,
              error: error.message,
            });
          }
        );
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          city: null,
          state: null,
          zip_code: null,
          error: "Geolocation is not supported by this browser.",
        });
      }
    };

    setDefaults({
      key: "AIzaSyDVAOhBM-eG0GAwcg0NESEMAodg72hzMhA",
      language: "en",
      region: "es",
      outputFormat: OutputFormat.JSON,
      location_type: "ROOFTOP",
    });

    const fetchData = async () => {
      await Promise.all([fetchBreeds(), fetchDogs()]);
      await getCurrentPosition();
    };

    fetchData();
  }, [currentPage, resultsPerPage]);

  return (
    <DogsContext.Provider
      value={{
        breeds,
        dogs,
        searchResultTotal,
        totalPages,
        currentPage,
        setCurrentPage,
        resultsPerPage,
        setResultsPerPage,
        favorites,
        setFavorites,
        location,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
