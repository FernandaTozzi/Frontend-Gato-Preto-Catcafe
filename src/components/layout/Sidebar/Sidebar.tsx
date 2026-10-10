import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import profileIcon from "../../../assets/profile-icon.png";
import pawIcon from "../../../assets/Patinha-Gato.png";
import cardapioIcon from "../../../assets/cardapio.png";
import atividadeIcon from "../../../assets/atividade-especial.png";
import contaDoacaoIcon from "../../../assets/conta-doacao.png";

export function Sidebar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return (
      <div style={mobileWrapper}>
        <button
          type="button"
          style={mobileHamburgerButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span style={hamburgerLine}></span>
          <span style={hamburgerLine}></span>
          <span style={hamburgerLine}></span>
        </button>

        {isOpen && (
          <div style={mobileMenu}>
            <Link
              to="/gerenciar/perfil"
              aria-label="Meu Perfil"
              style={{
                ...item,
                ...(isActive("/gerenciar/perfil") ? activeItem : {}),
              }}
              onClick={() => setIsOpen(false)}
            >
              <img src={profileIcon} alt="" style={icon} />
              <span>Meu Perfil</span>
            </Link>

            <Link
              to="/gerenciar/gatos"
              style={{
                ...item,
                ...(isActive("/gerenciar/gatos") ? activeItem : {}),
              }}
              onClick={() => setIsOpen(false)}
            >
              <img src={pawIcon} alt="" style={icon} />
              <span>Gatinhos</span>
            </Link>

            <Link
              to="/gerenciar/atividades"
              style={{
                ...item,
                ...(isActive("/gerenciar/atividades") ? activeItem : {}),
              }}
              onClick={() => setIsOpen(false)}
            >
              <img src={atividadeIcon} alt="" style={icon} />
              <span>Atividades Especiais</span>
            </Link>

            <Link
              to="/gerenciar/cardapio"
              style={{
                ...item,
                ...(isActive("/gerenciar/cardapio") ? activeItem : {}),
              }}
              onClick={() => setIsOpen(false)}
            >
              <img src={cardapioIcon} alt="" style={icon} />
              <span>Cardápio</span>
            </Link>

            <Link
              to="/gerenciar/conta-doacoes"
              style={{
                ...item,
                ...(isActive("/gerenciar/conta-doacoes") ? activeItem : {}),
              }}
              onClick={() => setIsOpen(false)}
            >
              <img src={contaDoacaoIcon} alt="" style={icon} />
              <span>Conta para Doações</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={isOpen ? sidebarOpen : sidebarClosed}>
      <div style={titleWrapper}>
        <button
          type="button"
          style={hamburgerButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span style={hamburgerLine}></span>
          <span style={hamburgerLine}></span>
          <span style={hamburgerLine}></span>
        </button>

        {isOpen && <h2 style={title}>Gerenciar</h2>}
      </div>

      <Link
        to="/gerenciar/perfil"
        aria-label="Meu Perfil"
        style={{
          ...item,
          ...(isActive("/gerenciar/perfil") ? activeItem : {}),
        }}
      >
        <img src={profileIcon} alt="" style={icon} />
        {isOpen && <span>Meu Perfil</span>}
      </Link>

      <Link
        to="/gerenciar/gatos"
        aria-label="Gatinhos"
        style={{
          ...item,
          ...(isActive("/gerenciar/gatos") ? activeItem : {}),
        }}
      >
        <img src={pawIcon} alt="" style={icon} />
        {isOpen && <span>Gatinhos</span>}
      </Link>

      <Link
        to="/gerenciar/atividades"
        aria-label="Atividades Especiais"
        style={{
          ...item,
          ...(isActive("/gerenciar/atividades") ? activeItem : {}),
        }}
      >
        <img src={atividadeIcon} alt="" style={icon} />
        {isOpen && <span>Atividades Especiais</span>}
      </Link>

      <Link
        to="/gerenciar/cardapio"
        aria-label="Cardápio"
        style={{
          ...item,
          ...(isActive("/gerenciar/cardapio") ? activeItem : {}),
        }}
      >
        <img src={cardapioIcon} alt="" style={icon} />
        {isOpen && <span>Cardápio</span>}
      </Link>

      <Link
        to="/gerenciar/conta-doacoes"
        aria-label="Conta para Doações"
        style={{
          ...item,
          ...(isActive("/gerenciar/conta-doacoes") ? activeItem : {}),
        }}
      >
        <img src={contaDoacaoIcon} alt="" style={icon} />
        {isOpen && <span>Conta para Doações</span>}
      </Link>
    </div>
  );
}

const mobileWrapper = {
  position: "relative" as const,
  width: "100%",
  height: "54px",
  minHeight: "54px",
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  boxSizing: "border-box" as const,
  marginBottom: "0",
};

const mobileHamburgerButton = {
  width: "42px",
  height: "42px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  borderRadius: "10px",
};

const mobileMenu = {
  position: "absolute" as const,
  top: "60px",
  left: "12px",
  width: "230px",
  background: "#ffffff",
  borderRadius: "18px",
  padding: "12px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column" as const,
  zIndex: 999,
};

const baseSidebar = {
  minHeight: "420px",
  flexShrink: 0,
  padding: "20px 12px",
  borderRight: "2px solid #e0e0e0",
  display: "flex",
  flexDirection: "column" as const,
  transition: "width 0.3s ease",
  overflow: "hidden",
};

const sidebarOpen = {
  ...baseSidebar,
  width: "230px",
};

const sidebarClosed = {
  ...baseSidebar,
  width: "72px",
};

const titleWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
};

const hamburgerButton = {
  width: "42px",
  height: "42px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
  borderRadius: "10px",
  flexShrink: 0,
};

const hamburgerLine = {
  width: "22px",
  height: "3px",
  backgroundColor: "#7c75a3",
  borderRadius: "10px",
};

const title = {
  color: "#7c75a3",
  margin: 0,
  fontSize: "24px",
  whiteSpace: "nowrap" as const,
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
  whiteSpace: "nowrap" as const,
  transition: "0.2s ease",
};

const activeItem = {
  background: "#e9e4f5",
  color: "#7c75a3",
};

const icon = {
  width: "20px",
  height: "20px",
  objectFit: "contain" as const,
  flexShrink: 0,
};