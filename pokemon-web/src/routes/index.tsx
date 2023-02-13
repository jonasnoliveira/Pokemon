import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/Home";
import FavoritePage from "pages/Favorites";

interface User {
  name: string;
  year: number;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Routes>
    </BrowserRouter>
  );
}
