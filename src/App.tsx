import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatsPage from "./pages/CatsPage";
import AtividadesPage from "./pages/AtividadesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/gatos" element={<CatsPage />} />
        <Route path="/atividades" element={<AtividadesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;