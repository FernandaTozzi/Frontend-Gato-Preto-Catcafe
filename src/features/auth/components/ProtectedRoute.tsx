import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../useAuth";
export function ProtectedRoute({ admin = false }: { admin?: boolean }) {
  const { user, loading, error, reload } = useAuth(); const location = useLocation();
  if (loading) return <p role="status" style={{ padding: 32 }}>Verificando sessão…</p>;
  if (error) return <div style={{ padding: 32 }}><p role="alert">{error}</p><button onClick={() => void reload()}>Tentar novamente</button></div>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (admin && user.tipoUsuario !== "ADM") return <Navigate to="/" replace />;
  return <Outlet />;
}
