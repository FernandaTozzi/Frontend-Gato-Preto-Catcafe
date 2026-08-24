import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatsPage from "./pages/CatsPage";
import AtividadesPage from "./pages/AtividadesPage";
import CardapioPage from "./pages/CardapioPage";
import ManagePage from "./pages/ManagePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/gerenciar" element={<ManagePage />}>
          <Route index element={<CatsPage />} />
          <Route path="gatos" element={<CatsPage />} />
          <Route path="atividades" element={<AtividadesPage />} />
          <Route path="cardapio" element={<CardapioPage />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;