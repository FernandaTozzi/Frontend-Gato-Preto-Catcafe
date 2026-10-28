import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/layout/Header/Header";
import { getMenuItems } from "../menu.service";
import type { MenuItem } from "../menu.types";
import { MenuCategoryBanner } from "../components/MenuCategoryBanner";
import type { CategoryKey } from "../components/MenuCategoryBanner";
import { PublicMenuItemCard } from "../components/PublicMenuItemCard";
import drinks from "../../../assets/banner-bebidas.png";
import savory from "../../../assets/banner-salgados.png";
import sweets from "../../../assets/banner-doces.png";
import meal from "../../../assets/banner-prato-feito.png";
import styles from "./PublicMenuPage.module.css";

const categories: { id: CategoryKey; title: string; image: string }[] = [
  { id: "bebidas", title: "Bebidas", image: drinks },
  { id: "salgados", title: "Salgados", image: savory },
  { id: "doces", title: "Doces", image: sweets },
  { id: "prato-feito", title: "Prato Feito", image: meal },
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function itemCategory(value: string): CategoryKey | null {
  const name = normalize(value);
  if (["bebidas quentes", "bebidas geladas", "bebidas"].includes(name)) return "bebidas";
  if (name === "salgados") return "salgados";
  if (name === "doces") return "doces";
  if (name === "prato feito") return "prato-feito";
  return null;
}

export default function PublicMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    getMenuItems().then(data => { if (active) { setItems(data); setError(""); } })
      .catch(() => { if (active) setError("Não foi possível carregar o cardápio. Verifique a conexão e tente novamente."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);

  const counts = useMemo(() => {
    const result: Record<CategoryKey, number> = { bebidas: 0, salgados: 0, doces: 0, "prato-feito": 0 };
    items.forEach(item => { const key = itemCategory(item.categoria); if (key) result[key]++; });
    return result;
  }, [items]);

  const filtered = useMemo(() => {
    const query = normalize(search);
    return items.filter(item => query ? normalize(item.nome).includes(query) : !category || itemCategory(item.categoria) === category);
  }, [items, search, category]);

  function chooseCategory(key: CategoryKey) {
    setSearch("");
    setCategory(current => current === key ? null : key);
  }

  const activeIndex = categories.findIndex((entry) => entry.id === category);

  function moveCategory(direction: number) {
    if (activeIndex < 0) return;
    const index = (activeIndex + direction + categories.length) % categories.length;
    setCategory(categories[index].id);
  }

  const grouped = categories.map((entry) => ({
    ...entry,
    items: filtered.filter((item) => itemCategory(item.categoria) === entry.id),
  }));
  const otherItems = filtered.filter((item) => itemCategory(item.categoria) === null);


  return (
    <div className={styles.background}><div className={styles.container}>
      <Header />
      <main className={styles.page}>
        <h1 className={styles.title}>Nosso Cardápio</h1>
        <div className={styles.searchWrap}>
          <label className={styles.srOnly} htmlFor="menu-search">Pesquisar pelo nome do item</label>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input id="menu-search" type="search" className={styles.search} value={search} placeholder="Pesquisar no cardápio..." onChange={event => { setSearch(event.target.value); if (event.target.value.trim()) setCategory(null); }} />
          <span className={styles.paw} aria-hidden="true">🐾</span>
        </div>
        {!search.trim() && (
          <div className={`${styles.categories} ${category ? styles.categorySelected : ""}`}>
            {categories.map((entry) => (
              <div
                key={entry.id}
                className={`${styles.bannerWrapper} ${category === entry.id ? styles.activeBanner : ""}`}
              >
                <MenuCategoryBanner
                  category={entry.id}
                  title={entry.title}
                  image={entry.image}
                  count={loading || error ? null : counts[entry.id]}
                  selected={category === entry.id}
                  onClick={() => chooseCategory(entry.id)}
                />
              </div>
            ))}
            {category && (
              <div className={styles.mobileCarouselControls} aria-label="Navegação de categorias">
                <button type="button" className={styles.carouselArrow} aria-label="Categoria anterior" onClick={() => moveCategory(-1)}>‹</button>
                <div className={styles.carouselDots}>
                  {categories.map((entry) => (
                    <button key={entry.id} type="button" className={`${styles.dot} ${category === entry.id ? styles.activeDot : ""}`} aria-label={`Ver ${entry.title}`} aria-pressed={category === entry.id} onClick={() => setCategory(entry.id)} />
                  ))}
                </div>
                <button type="button" className={styles.carouselArrow} aria-label="Próxima categoria" onClick={() => moveCategory(1)}>›</button>
              </div>
            )}
          </div>
        )}
        <section className={styles.itemsSection} aria-label="Itens do cardápio">
          {(category || search.trim()) && <button type="button" className={styles.allButton} onClick={() => { setCategory(null); setSearch(""); }}>Ver todos os itens ›</button>}
          {loading && <p className={styles.message} role="status">Carregando cardápio...</p>}
          {!loading && error && <div className={styles.message} role="alert"><p>{error}</p><button type="button" onClick={() => { setLoading(true); setError(""); setRetry(n => n + 1); }}>Tentar novamente</button></div>}
          {!loading && !error && filtered.length === 0 && <p className={styles.message}>{search.trim() ? "Nenhum item encontrado para essa pesquisa." : category ? "Nenhum item cadastrado nesta categoria." : "Ainda não há itens cadastrados no cardápio."}</p>}
          {!loading && !error && grouped.filter(group => group.items.length > 0).map(group => (
            <section className={styles.itemGroup} key={group.id} aria-labelledby={`category-${group.id}`}>
              <div className={styles.heading}><h2 id={`category-${group.id}`}>{group.title}</h2><span className={styles.line} /></div>
              <div className={styles.grid}>{group.items.map(item => <PublicMenuItemCard key={item.id} item={item} />)}</div>
            </section>
          ))}
          {!loading && !error && otherItems.length > 0 && (
            <section className={styles.itemGroup} aria-labelledby="category-other">
              <div className={styles.heading}><h2 id="category-other">Outros</h2><span className={styles.line} /></div>
              <div className={styles.grid}>{otherItems.map(item => <PublicMenuItemCard key={item.id} item={item} />)}</div>
            </section>
          )}
        </section>
      </main>
    </div></div>
  );
}