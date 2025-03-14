import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { FavoritesProvider } from "./features/favorites/FavoritesContext";
import { AppRoutes } from "./routes";
import { Header } from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <div className="app">
            <Header />
            <main>
              <AppRoutes />
            </main>
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
