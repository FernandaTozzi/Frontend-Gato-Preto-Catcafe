import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Início" },
    { path: "/sobre", label: "Sobre Nós" },
    { path: "/local", label: "Local" },
    { path: "/cardapio", label: "Cardápio" },
    { path: "/atividades", label: "Atividades" },
    { path: "/adocao", label: "Quero Adotar" },
    { path: "/doacao", label: "Doação" },
    { path: "/perguntas", label: "Perguntas" },
    { path: "/contato", label: "Contato" },
  ];

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="Logo Gato Preto Cat Café" className={styles.logo} />

        <nav className={styles.nav}>
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/perfil" className={styles.profileLink}>
          <img src={profile} alt="Perfil" className={styles.profile} />
        </NavLink>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <button
          className={styles.closeButton}
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>

        <img src={logo} alt="Logo Gato Preto Cat Café" className={styles.menuLogo} />

        <nav className={styles.mobileNav}>
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileLink} ${styles.mobileActive}`
                  : styles.mobileLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/perfil" onClick={() => setMenuOpen(false)}>
          <img src={profile} alt="Perfil" className={styles.menuProfile} />
        </NavLink>
      </div>
    </>
  );
}

export default Header;