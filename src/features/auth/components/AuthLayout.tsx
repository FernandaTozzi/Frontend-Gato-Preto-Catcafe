import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";
import titleImage from "../../../assets/title.png";

import styles from "./AuthLayout.module.css";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

function SocialLinks() {
  return (
    <div className={styles.socials}>
      <p>Acompanhe nossas redes</p>

      <div className={styles.socialLinks}>
        <a
          href="https://www.instagram.com/gatopretocatcafe/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram do Gato Preto Cat Café (abre em nova aba)"
        >
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
          >
            <rect
              width="32"
              height="32"
              rx="8"
              fill="currentColor"
            />

            <rect
              x="7"
              y="7"
              width="18"
              height="18"
              rx="6"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            />

            <circle
              cx="16"
              cy="16"
              r="4.5"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            />

            <circle
              cx="22"
              cy="10"
              r="1.5"
              fill="#fff"
            />
          </svg>
        </a>

        <a
          href="https://www.tiktok.com/@gatopreto.catcafe"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok do Gato Preto Cat Café (abre em nova aba)"
        >
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
          >
            <rect
              width="32"
              height="32"
              rx="8"
              fill="currentColor"
            />

            <path
              d="M18 7v14a5 5 0 1 1-5-5M18 7c0 5 3 7 7 7"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className={styles.page}>
      <div className={styles.mobileBrand}>
        <Link to="/" aria-label="Voltar ao início">
          <img src={logo} alt="Gato Preto Cat Café" />
        </Link>
      </div>

      <section className={styles.panel}>
        <div className={styles.content}>
          <h1>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          {children}
        </div>
      </section>

      <aside
        className={styles.art}
        aria-label="Gato Preto Cat Café"
      >
        <Link to="/" className={styles.brand}>
          <img
            className={styles.titleImage}
            src={titleImage}
            alt="Gato Preto Cat Café"
          />

          <img
            className={styles.logo}
            src={logo}
            alt=""
          />
        </Link>

        <SocialLinks />
      </aside>

      <footer className={styles.mobileFooter}>
        <SocialLinks />

        <Link to="/" className={styles.backLink}>
          Voltar para o site
        </Link>
      </footer>
    </main>
  );
}