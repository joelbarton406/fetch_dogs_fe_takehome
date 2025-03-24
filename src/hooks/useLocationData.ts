import { useQuery } from "react-query";
import getDistanceBetweenZipCodes from "@/utils/calculateDistance";
import { fetchZipData } from "@/api/location";
import { ZipData } from "@/types/api";

async function fetchZipLocationData(zipCode: string, currentZipCode: string) {
  try {
    const distance = await getDistanceBetweenZipCodes(zipCode, currentZipCode);
    const zipData = await fetchZipData(
      `http://api.zippopotam.us/us/${zipCode}`
    );
    const city = zipData.places?.[0]?.["place name"] || "";
    const state = zipData.places?.[0]?.["state abbreviation"] || "";

    return { city, state, distance };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch location data for ZIP: ${zipCode}`);
  }
}

export function useLocationData(zipCode?: string, currentZipCode?: string) {
  return useQuery<ZipData, Error>(
    ["zipData", zipCode, currentZipCode],
    () => fetchZipLocationData(zipCode!, currentZipCode!),
    {
      enabled: Boolean(zipCode && currentZipCode),
      //   staleTime: Infinity,
      //   cacheTime: Infinity,
      //   retry: true,
      //   retryDelay: 2000,
    }
  );
}
