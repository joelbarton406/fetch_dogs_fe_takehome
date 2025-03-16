import { fromAddress } from "react-geocode";

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
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

async function getDistanceBetweenZipCodes(zip1: string, zip2: string) {
  try {
    const response1 = await fromAddress(zip1);
    const response2 = await fromAddress(zip2);

    const { lat: lat1, lng: lon1 } = response1.results[0].geometry.location;
    const { lat: lat2, lng: lon2 } = response2.results[0].geometry.location;

    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    console.log(
      `Distance between ${zip1} and ${zip2} is ${distance.toFixed(2)} km`
    );

    return distance;
  } catch (error) {
    console.error("Error fetching geocode data:", error);
  }
}

export default getDistanceBetweenZipCodes;
