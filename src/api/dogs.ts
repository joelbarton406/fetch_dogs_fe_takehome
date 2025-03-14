import { apiClient } from "./client";
import { Dog, SearchResponse, Match } from "../types/api";

export const getBreeds = () => {
  return apiClient.get<string[]>("/dogs/breeds");
};

export const searchDogs = (params: string) => {
  return apiClient.get<SearchResponse>("/dogs/search", { params });
};

export const getDogs = (ids: string[]) => {
  return apiClient.post<Dog[]>("/dogs", ids);
};

export const getMatch = (ids: string[]) => {
  return apiClient.post<Match>("/dogs/match", ids);
};
