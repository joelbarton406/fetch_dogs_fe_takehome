import { useEffect, useState } from "react";
import { setDefaults, fromLatLng, OutputFormat } from "react-geocode";

export interface UserLocation {
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  state: string | null;
}

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    latitude: null,
    longitude: null,
    city: null,
    state: null,
    zip_code: null,
  });

  useEffect(() => {
    const extractAddressComponent = (components: any[], type: string) =>
      components.find((comp) => comp.types.includes(type))?.long_name || null;

    const fetchUserLocation = async (latitude: number, longitude: number) => {
      try {
        const response = await fromLatLng(latitude, longitude);
        const addressComponents = response.results[0]?.address_components || [];
        setUserLocation({
          latitude,
          longitude,
          city: extractAddressComponent(addressComponents, "locality"),
          state: extractAddressComponent(
            addressComponents,
            "administrative_area_level_1"
          ),
          zip_code: extractAddressComponent(addressComponents, "postal_code"),
        });
      } catch (error) {
        console.error(error);
        setUserLocation((prev) => ({ ...prev }));
      }
    };

    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        return setUserLocation((prev) => ({
          ...prev,
          error: "Geolocation is not supported by this browser.",
        }));
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          fetchUserLocation(latitude, longitude),
        (error) =>
          setUserLocation((prev) => ({ ...prev, error: error.message }))
      );
    };

    setDefaults({
      key: "AIzaSyDVAOhBM-eG0GAwcg0NESEMAodg72hzMhA", // visible but restricted key
      language: "en",
      region: "es",
      outputFormat: OutputFormat.JSON,
      location_type: "ROOFTOP",
    });

    getCurrentPosition();
  }, []);

  return { userLocation };
};
