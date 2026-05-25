import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import pawIcon from "../assets/Patinha-Gato.png";
import cardapioIcon from "../assets/cardapio.png";
import atividadeIcon from "../assets/atividade-especial.png";

export function Sidebar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
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
              to="/cats"
              style={{
                ...item,
                ...(isActive("/cats") ? activeItem : {}),
              }}
              onClick={() => setIsOpen(false)}
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
        to="/cats"
        style={{
          ...item,
          ...(isActive("/cats") ? activeItem : {}),
          justifyContent: isOpen ? "flex-start" : "center",
        }}
      >
        <img src={pawIcon} style={icon} />

        {isOpen && <span>Gatinhos</span>}
      </Link>

      <div
        style={{
          ...item,
          justifyContent: isOpen ? "flex-start" : "center",
        }}
      >
        <img src={atividadeIcon} style={icon} />

        {isOpen && <span>Atividades Especiais</span>}
      </div>

      <div
        style={{
          ...item,
          justifyContent: isOpen ? "flex-start" : "center",
        }}
      >
        <img src={cardapioIcon} style={icon} />

        {isOpen && <span>Cardápio</span>}
      </div>
    </div>
  );
}

const mobileWrapper = {
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
  minHeight: "100vh",
  
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