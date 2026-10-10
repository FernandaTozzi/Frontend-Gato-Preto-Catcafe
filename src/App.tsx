import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import HomePage from "./pages/HomePage";
import CatsPage from "./features/cats/pages/CatsPage";
import ActivitiesPage from "./features/activities/pages/ActivitiesPage";
import MenuPage from "./features/menu/pages/MenuPage";
import ManagePage from "./pages/ManagePage";
import DonationAccountPage from "./features/donations/pages/DonationAccountPage";

function App() {
  return (
    <BrowserRouter><AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/perfil" element={<Navigate to="/gerenciar/perfil" replace />} />
        <Route path="/gerenciar" element={<ManagePage />}>
          <Route index element={<Navigate to="perfil" replace />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route element={<ProtectedRoute admin />}>
          <Route path="gatos" element={<CatsPage />} />
          <Route path="atividades" element={<ActivitiesPage />} />
          <Route path="cardapio" element={<MenuPage />} />
          <Route path="conta-doacoes" element={<DonationAccountPage />} />
          </Route>
        </Route>
        </Route>
       
      </Routes>
    </AuthProvider></BrowserRouter>
  );
}

export default App;