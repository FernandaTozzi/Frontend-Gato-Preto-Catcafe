import aboutImage from "../../../assets/Sobre-nos.png";
import plantTop from "../../../assets/black-plant1.png";
import plantBottom from "../../../assets/black-plant2.png";
import brownShape from "../../../assets/brown.svg";

import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section
      id="sobre-nos"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <img
        src={brownShape}
        alt=""
        aria-hidden="true"
        className={styles.desktopShape}
      />

      <img
        src={brownShape}
        alt=""
        aria-hidden="true"
        className={styles.mobileShape}
      />

      <img
        src={plantTop}
        alt=""
        aria-hidden="true"
        className={styles.plantTop}
        loading="lazy"
      />

      <img
        src={plantBottom}
        alt=""
        aria-hidden="true"
        className={styles.plantBottom}
        loading="lazy"
      />

      <div className={styles.content}>
        <img
          src={aboutImage}
          alt="Uma mulher com um gato preto no Gato Preto Cat Café"
          className={styles.photo}
          loading="lazy"
        />

        <div className={styles.text}>
          <h2 id="about-title">Sobre Nós</h2>

          <p>
            No Gato Preto Cat Café, café, conforto e gatinhos fazem
            parte da mesma experiência. Nosso espaço é um convite
            para fazer uma pausa, conhecer nossos sabores e
            aproveitar a companhia dos nossos gatos.
          </p>

          <p>
            Acreditamos no carinho e na adoção responsável. Venha
            nos conhecer e acompanhar nossas atividades. Quem sabe
            você encontre um novo melhor amigo por aqui?
          </p>

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
                  stroke="var(--about-brown)"
                  strokeWidth="2"
                />

                <circle
                  cx="16"
                  cy="16"
                  r="4.5"
                  fill="none"
                  stroke="var(--about-brown)"
                  strokeWidth="2"
                />

                <circle
                  cx="22"
                  cy="10"
                  r="1.5"
                  fill="var(--about-brown)"
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
                  stroke="var(--about-brown)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}