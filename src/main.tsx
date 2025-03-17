import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate, // Import Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import { DogsProvider } from "@/contexts/DogsContext.tsx";

import HomeLayout from "@/components/HomeLayout.tsx";
import Error from "@/components/Error.tsx";
import Login from "@/components/Login.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";

import Results from "./components/Results.tsx";
import Sort from "./components/Sort.tsx";
import Filter from "./components/Filter.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/search" replace />,
      },
      {
        path: "/search",
        element: (
          <ProtectedRoute>
            <DogsProvider>
              <div className="flex flex-col justify-between h-[220px]">
                <Filter />
                <Sort />
              </div>
              <Results />
            </DogsProvider>
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      { path: "/login", element: <Login />, errorElement: <Error /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
