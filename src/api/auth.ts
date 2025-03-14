import { apiClient } from "./client";

export const verifySession = async () => {
  try {
    // Use any authenticated endpoint, like fetching breeds
    console.log("testing an authenticated endpoint...");
    await apiClient.get("/dogs/breeds");
    console.log("Successful!");
    return true; // Session is valid
  } catch (error: unknown) {
    console.log(error);
    return false; // Session expired or invalid
  }
};

export const login = (name: string, email: string) => {
  return apiClient.post("/auth/login", { name, email });
};

export const logout = () => {
  return apiClient.post("/auth/logout");
};
