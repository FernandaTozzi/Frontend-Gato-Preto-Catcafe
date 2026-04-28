import { Link, useLocation } from "react-router-dom";
import pawIcon from "../assets/Patinha-Gato.png";
import cardapioIcon from "../assets/cardapio.png";
import atividadeIcon from "../assets/atividade-especial.png";

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={sidebar}>
      <h2 style={title}>Gerenciar</h2>

      <Link
        to="/cats"
        style={{
          ...item,
          ...(isActive("/cats") ? activeItem : {}),
        }}
      >
        <img src={pawIcon} style={icon} />
        Gatinhos
      </Link>

      <div style={item}>
        <img src={atividadeIcon} style={icon} />
        Atividades Especiais
      </div>

      <div style={item}>
        <img src={cardapioIcon} style={icon} />
        Cardápio
      </div>
    </div>
  );
}

const sidebar = {
  width: "230px",
  padding: "20px",
  borderRight: "2px solid #e0e0e0",
  display: "flex",
  flexDirection: "column" as const,
};

const title = {
  color: "#7c75a3",
  marginBottom: "20px",
};

const item = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#7a6f6f",
  cursor: "pointer",
  fontWeight: 500,
};

const activeItem = {
  background: "#e9e4f5",
  color: "#7c75a3",
};

const icon = {
  width: "20px",
  height: "20px",
  objectFit: "contain" as const,
};