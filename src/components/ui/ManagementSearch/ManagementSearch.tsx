import styles from "./ManagementSearch.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
};

export function ManagementSearch({ value, onChange, label }: Props) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.srOnly} htmlFor="management-search">{label}</label>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <input id="management-search" className={styles.input} type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Pesquisar..." />
    </div>
  );
}

export function matchesSearch(query: string, fields: Array<string | number | null | undefined>) {
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const text = normalize(fields.filter((field) => field != null).join(" "));
  return words.every((word) => text.includes(word));
}
