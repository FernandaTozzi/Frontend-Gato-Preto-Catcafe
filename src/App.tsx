import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatsPage from "./features/cats/pages/CatsPage";
import ActivitiesPage from "./features/activities/pages/ActivitiesPage";
import MenuPage from "./features/menu/pages/MenuPage";
import ManagePage from "./pages/ManagePage";
import DonationAccountPage from "./features/donations/pages/DonationAccountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/gerenciar" element={<ManagePage />}>
          <Route index element={<CatsPage />} />
          <Route path="gatos" element={<CatsPage />} />
          <Route path="atividades" element={<ActivitiesPage />} />
          <Route path="cardapio" element={<MenuPage />} />
          <Route path="conta-doacoes" element={<DonationAccountPage />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;