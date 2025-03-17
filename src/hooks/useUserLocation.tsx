import { useEffect, useState } from "react";
import { setDefaults, fromLatLng, OutputFormat } from "react-geocode";

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
}

export const useUserLocation = () => {
  const [location, setLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
    error: null,
    city: null,
    state: null,
    zip_code: null,
  });

  useEffect(() => {
    const fetchUserLocation = async (latitude: number, longitude: number) => {
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
            await fetchUserLocation(latitude, longitude);
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

    getCurrentPosition();
  }, []);

  return { location };
};
