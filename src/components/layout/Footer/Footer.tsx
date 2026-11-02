import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";
import styles from "./Footer.module.css";

// A imagem decorativa é opcional enquanto cat-pose3.png não estiver em assets.
const catImages = import.meta.glob("../../../assets/cat-pose3.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const catPose = Object.values(catImages)[0] as string | undefined;

export default function Footer() {
  return (
    <div className={styles.outer}>
      <footer className={styles.footer} aria-label="Rodapé do Gato Preto Cat Café">
        {catPose && (
          <img
            src={catPose}
            alt=""
            aria-hidden="true"
            className={styles.catPose}
          />
        )}

        <div className={styles.content}>
          <Link to="/" className={styles.brand} aria-label="Gato Preto Cat Café — início">
            <img src={logo} alt="Gato Preto Cat Café" />
          </Link>

          <div className={styles.infoGroup}>
            <div className={styles.infoBlock}>
              <h2>Endereço</h2>
              <p>Rua Espírito Santo 1123,</p>
              <p>Londrina, Paraná, 86020-420</p>
            </div>

            <div className={styles.infoBlock}>
              <h2>Horário de Funcionamento</h2>
              <p>Segunda à Sábado 10:00 - 19:00</p>
            </div>
          </div>

          <div className={styles.infoGroup}>
            <div className={styles.infoBlock}>
              <h2>Email</h2>
              <a href="mailto:GatoPreto@gmail.com">GatoPreto@gmail.com</a>
            </div>

            <div className={styles.infoBlock}>
              <h2>Redes Sociais:</h2>
              <div className={styles.socials}>
                <a
                  href="https://www.instagram.com/gatopretocatcafe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram do Gato Preto (abre em nova aba)"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@gatopreto.catcafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok do Gato Preto (abre em nova aba)"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 3v11a4 4 0 1 1-4-4M14 3c0 3.3 2.1 5 5 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h2>Telefone</h2>
              <p>(43) 98870-2054</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
