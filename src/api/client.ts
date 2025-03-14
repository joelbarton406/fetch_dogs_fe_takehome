import axios from "axios";

const BASE_URL = "https://frontend-take-home-service.fetch.com";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
