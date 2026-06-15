import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";

function Header() {
  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt="Logo Gato Preto Cat Café"
        className={styles.logo}
      />

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Início
        </NavLink>

        <NavLink
          to="/sobre"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Sobre Nós
        </NavLink>

        <NavLink
          to="/local"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Local
        </NavLink>

        <NavLink
          to="/cardapio"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Cardápio
        </NavLink>

        <NavLink
          to="/atividades"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Atividades
        </NavLink>

        <NavLink
          to="/adocao"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Quero Adotar
        </NavLink>

        <NavLink
          to="/doacao"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Doação
        </NavLink>

        <NavLink
          to="/perguntas"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Perguntas
        </NavLink>

        <NavLink
          to="/contato"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.active}`
              : styles.link
          }
        >
          Contato
        </NavLink>
      </nav>

      <NavLink to="/perfil">
        <img
          src={profile}
          alt="Perfil"
          className={styles.profile}
        />
      </NavLink>
    </header>
  );
}

export default Header;