import aboutImage from "../../../assets/Sobre-nos.png";
import plantTop from "../../../assets/black-plant1.png";
import plantBottom from "../../../assets/black-plant2.png";

import styles from "./AboutSection.module.css";

export function AboutSection() {  
  return (
    <section
      id="sobre-nos"
      className={styles.section}
      aria-labelledby="about-title"
    >
      <svg
        className={styles.desktopShape}
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="
            M0 190
            C85 80 150 0 270 24
            C440 58 520 150 710 100
            C850 64 930 25 1000 0
            V500
            C910 444 875 410 790 430
            C555 482 350 505 180 478
            C70 460 15 402 0 355
            Z
          "
          fill="currentColor"
        />
      </svg>

      <svg
        className={styles.mobileShape}
        viewBox="0 0 400 700"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="
            M0 10
            C80 0 140 75 240 75
            C310 75 355 55 400 30
            V665
            C310 615 270 595 200 620
            C105 651 50 685 0 685
            Z
          "
          fill="currentColor"
        />
      </svg>

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