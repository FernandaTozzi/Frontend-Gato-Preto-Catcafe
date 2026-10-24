import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/layout/Header/Header";
import { AboutSection } from "../features/home/components/AboutSection";

import banner from "../assets/banner.png";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
import gatoPreto from "../assets/gatoPreto.png";
import moon from "../assets/moon.png";

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (hash === "#sobre-nos") {
        document.getElementById("sobre-nos")?.scrollIntoView({
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
    <>
      <Header />

      <main style={page}>
        <section style={hero}>
          <img
            src={banner}
            alt="Banner"
            style={bannerStyle}
          />

          <div style={heroContent}>
            <img
              src={logo}
              alt="Logo Gato Preto"
              style={logoStyle}
            />

            <img
              src={title}
              alt="Gato Preto Cat Café"
              style={titleStyle}
            />

            <img
              src={gatoPreto}
              alt="Gato preto"
              style={catStyle}
            />
          </div>
        </section>

        <hr style={divider} />

        <section style={intro}>
          <p style={paragraph}>
            Bem-vindo ao{" "}
            <strong style={{ color: "#000000" }}>
              Gato Preto Cat Café
            </strong>
            , o lugar perfeito pra quem ama café, conforto e
            gatinhos. Venha nos conhecer, e talvez sair daqui
            com um novo melhor amigo.
          </p>

          <img
            src={moon}
            alt="Fases da lua"
            style={moonStyle}
          />
        </section>

        <AboutSection />
      </main>
    </>
  );
}

const page = {
  minHeight: "100vh",
  backgroundColor: "#fbf4e8",
};

const hero = {
  position: "relative" as const,
  width: "100%",
  height: "430px",
  overflow: "visible" as const,
};

const bannerStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  display: "block",
};

const heroContent = {
  position: "absolute" as const,
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  width: "100%",
};

const logoStyle = {
  width: "80px",
  marginBottom: "10px",
};

const titleStyle = {
  width: "420px",
  maxWidth: "85%",
};

const catStyle = {
  width: "230px",
  marginTop: "-0.1px",
};

const divider = {
  border: "none",
  height: "10px",
  backgroundColor: "#CEAE94",
  width: "100%",
  margin: "0",
};

const intro = {
  textAlign: "center" as const,
  padding: "90px 20px 40px",
};

const paragraph = {
  maxWidth: "560px",
  margin: "0 auto",
  color: "#a69be0",
  fontSize: "22px",
  fontWeight: 700,
  lineHeight: 1.35,
};

const moonStyle = {
  width: "130px",
  marginTop: "25px",
};

export default HomePage;