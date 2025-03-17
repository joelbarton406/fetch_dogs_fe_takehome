// hooks/useLocationData.ts
import { useQuery } from "react-query";
import getDistanceBetweenZipCodes from "@/utils/calculateDistance";

interface ZippopotamUsResponse {
  places?: {
    ["place name"]: string;
    state: string;
    ["state abbreviation"]: string;
  }[];
}

interface ZipData {
  city: string;
  state: string;
  distance: number | null;
}

async function fetchZipLocationData(
  zipCode: string,
  currentZipCode: string
): Promise<ZipData> {
  const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch location data for ZIP: ${zipCode}`);
  }
  const data: ZippopotamUsResponse = await response.json();

  let city = "";
  let state = "";
  if (data.places && data.places[0]) {
    city = data.places[0]["place name"];
    state = data.places[0]["state abbreviation"];
  }

  let distance: number | null = null;
  if (zipCode && currentZipCode) {
    distance = await getDistanceBetweenZipCodes(zipCode, currentZipCode);
  }

  return { city, state, distance };
}

export function useLocationData(zipCode?: string, currentZipCode?: string) {
  return useQuery<ZipData, Error>(
    ["zipData", zipCode, currentZipCode],
    () => fetchZipLocationData(zipCode!, currentZipCode!),
    {
      enabled: Boolean(zipCode && currentZipCode),
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    }
  );
}
