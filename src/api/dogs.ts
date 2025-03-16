import { apiClient } from "./client";
import { Dog, SearchResponse, Match } from "../types/api";
import qs from "qs";

export const getBreeds = () => {
  return apiClient.get<string[]>("/dogs/breeds");
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

  const response = await apiClient.get<SearchResponse>(
    `/dogs/search?${encodedParams}`
  );
  return response;
};

export const getDogs = (ids: string[]) => {
  return apiClient.post<Dog[]>("/dogs", ids);
};

export const getMatch = (ids: string[]) => {
  return apiClient.post<Match>("/dogs/match", ids);
};
