import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "pages/Home";

interface User {
  name: string;
  year: number;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
  );
}
