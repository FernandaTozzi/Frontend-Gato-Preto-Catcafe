import { useState } from "react";
import type { MenuItem } from "../menu.types";
import { API_BASE_URL } from "../../../services/api";
import fallback from "../../../assets/cardapio.png";
import styles from "../pages/PublicMenuPage.module.css";

export function PublicMenuItemCard({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const image = item.imagem && !imageFailed ? `${API_BASE_URL}/uploads/${item.imagem}` : fallback;
  const price = Number(item.preco);
  return (
    <article className={styles.card}>
      <img className={styles.itemImage} src={image} alt={item.nome} loading="lazy" onError={() => setImageFailed(true)} />
      <div className={styles.cardContent}>
        <div className={styles.itemText}>
          <h3>{item.nome}</h3>
          <p>{Number.isFinite(price) ? price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "Preço indisponível"}</p>
        </div>
        <button className={styles.details} type="button" aria-expanded={open} aria-label={`${open ? "Ocultar" : "Ver"} descrição de ${item.nome}`} onClick={() => setOpen(!open)}>{open ? "−" : "+"}</button>
      </div>
      {open && <p className={styles.description}>{item.descricao?.trim() || "Descrição não informada."}</p>}
    </article>
  );
}
