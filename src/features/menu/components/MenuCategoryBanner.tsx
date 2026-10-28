import styles from "../pages/PublicMenuPage.module.css";

export type CategoryKey = "bebidas" | "salgados" | "doces" | "prato-feito";

type Props = {
  category: CategoryKey;
  title: string;
  image: string;
  count: number | null;
  selected: boolean;
  onClick: () => void;
};

export function MenuCategoryBanner({ category, title, image, count, selected, onClick }: Props) {
  return (
    <button type="button" className={`${styles.banner} ${styles[category]} ${selected ? styles.selected : ""}`} onClick={onClick} aria-pressed={selected}>
      <span className={styles.shape} aria-hidden="true" />
      <span className={styles.bannerText}>
        <span className={styles.bannerTitle}>{title}</span>
        <span className={styles.count}>{count === null ? "—" : `${count} ${count === 1 ? "item" : "itens"}`}</span>
      </span>
      <img className={styles.bannerImage} src={image} alt="" />
      {!selected && <span className={styles.arrow} aria-hidden="true">›</span>}
    </button>
  );
}
