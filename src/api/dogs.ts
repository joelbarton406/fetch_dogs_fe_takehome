import { apiClient } from "./client";
import { Dog, Match } from "../types/api";
import qs from "qs";

export const getBreeds = async () => {
  const response = await apiClient.get<string[]>("/dogs/breeds");
  return response.data;
};

export const searchDogs = async (params: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: string;
  sort?: string;
}) => {
  const encodedParams = qs.stringify(params, { arrayFormat: "brackets" });
  const response = await apiClient.get(`/dogs/search?${encodedParams}`);
  return response.data;
};

export const getDogs = async (ids: string[]) => {
  const response = await apiClient.post<Dog[]>("/dogs", ids);
  return response.data;
};

export const getMatch = async (ids: string[]) => {
  const response = await apiClient.post<Match>("/dogs/match", ids);
  return response.data;
};
