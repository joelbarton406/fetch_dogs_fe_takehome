import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "@/contexts/AuthContext.tsx";

import HomeLayout from "@/components/HomeLayout.tsx";
import NotFound from "@/components/NotFound.tsx";
import Login from "@/components/Login.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import SearchLayout from "@/components/SearchLayout.tsx";
import "@/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/search" replace />,
      },
      {
        path: "/search",
        element: (
          <ProtectedRoute>
            <SearchLayout />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);
