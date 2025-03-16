import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate, // Import Navigate
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { DogsProvider } from "./contexts/DogsContext.tsx";
import HomeLayout from "./components/HomeLayout.tsx";
import Error from "./components/Error.tsx";
import Search from "./components/SearchResults.tsx";
import { LoginForm } from "./features/auth/LoginForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import "./index.css";
import Filter from "./components/Filter.tsx";

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
              {/* <div>Favorites</div> */}
              {/* <Filter /> */}
              <Search />
            </DogsProvider>
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      { path: "/login", element: <LoginForm />, errorElement: <Error /> },
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
