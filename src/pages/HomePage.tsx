import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/layout/Header/Header";
import { AboutSection } from "../features/home/components/AboutSection";
import { LocationSection } from "../features/home/components/LocationSection";

import banner from "../assets/banner.png";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
import gatoPreto from "../assets/gatoPreto.png";
import moon from "../assets/moon.png";

import styles from "./HomePage.module.css";

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (hash === "#sobre-nos" || hash === "#local") {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      } else if (!hash) {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Header />

        <main className={styles.page}>
          <section className={styles.hero}>
            <img
              src={banner}
              alt="Banner"
              className={styles.banner}
            />

            <div className={styles.heroContent}>
              <img
                src={logo}
                alt="Logo Gato Preto"
                className={styles.logo}
              />

              <img
                src={title}
                alt="Gato Preto Cat Café"
                className={styles.title}
              />

              <img
                src={gatoPreto}
                alt="Gato preto"
                className={styles.cat}
              />
            </div>
          </section>

          <hr className={styles.divider} />

          <section className={styles.intro}>
            <p className={styles.paragraph}>
              Bem-vindo ao{" "}
              <strong>Gato Preto Cat Café</strong>, o lugar
              perfeito pra quem ama café, conforto e gatinhos.
              Venha nos conhecer, e talvez sair daqui com um
              novo melhor amigo.
            </p>

            <img
              src={moon}
              alt="Fases da lua"
              className={styles.moon}
            />
          </section>

          <AboutSection />
          <LocationSection />
        </main>
      </div>
    </div>
  );
}

export default HomePage;