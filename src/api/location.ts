import axios from "axios";
import { apiClient } from "./client";
import { Location, ZippopotamUsResponse } from "@/types/api";

export const fetchDogLocations = async (zipCodes: string[]) => {
  try {
    const response = await apiClient.post<Location[]>("/locations", zipCodes);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const fetchZipData = async (zipCode: string) => {
  try {
    const response = await axios.get<ZippopotamUsResponse>(
      `http://api.zippopotam.us/us/${zipCode}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ZipData:", error);
    throw new Error("ZippopotamUs failed!");
  }
};
