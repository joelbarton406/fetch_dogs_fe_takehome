import { fromAddress } from "react-geocode";

const zipCoordCache: Record<string, { lat: number; lng: number }> = {};

const distanceCache: Record<string, number> = {};

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function getCoordinatesForZip(zip: string) {
  if (zipCoordCache[zip]) {
    return zipCoordCache[zip];
  }

  try {
    const response = await fromAddress(zip);
    const location = response.results[0].geometry.location;

    zipCoordCache[zip] = location;

    return location;
  } catch (error) {
    console.error(`Error fetching coordinates for ${zip}:`, error);
    throw error;
  }
}

async function getDistanceBetweenZipCodes(
  zip1: string,
  zip2: string
): Promise<number> {
  const cacheKey = [zip1, zip2].sort().join("-");

  if (distanceCache[cacheKey] !== undefined) {
    return distanceCache[cacheKey];
  }

  try {
    const [coord1, coord2] = await Promise.all([
      getCoordinatesForZip(zip1),
      getCoordinatesForZip(zip2),
    ]);

    const distance = haversineDistance(
      coord1.lat,
      coord1.lng,
      coord2.lat,
      coord2.lng
    );

    distanceCache[cacheKey] = distance;

    return distance;
  } catch (error) {
    console.error(
      `Error calculating distance between ${zip1} and ${zip2}:`,
      error
    );
    return 0;
  }
}

export default getDistanceBetweenZipCodes;
