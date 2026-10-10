import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import titleImage from "../../../assets/title.png";
import styles from "./AuthLayout.module.css";
export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <main className={styles.page}><div className={styles.mobileBrand}><Link to="/" aria-label="Voltar ao início"><img src={logo} alt="Gato Preto Cat Café" /></Link></div>
    <section className={styles.panel}><div className={styles.content}><h1>{title}</h1><p className={styles.subtitle}>{subtitle}</p>{children}</div></section>
    <aside className={styles.art} aria-label="Gato Preto Cat Café"><Link to="/" className={styles.brand}><img className={styles.titleImage} src={titleImage} alt="Gato Preto Cat Café" /><img className={styles.logo} src={logo} alt="" /></Link></aside>
    <footer className={styles.mobileFooter}><Link to="/">Voltar para o site</Link></footer></main>;
}
