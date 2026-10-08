import styles from "./FormField.module.css";
export function ValidationLabel({ text, error }: { text: string; error?: string }) {
  return <div className={styles.labelRow}>
    <label className={error ? styles.labelError : styles.label}>{text}<span className={styles.required}>*</span></label>
    {error && <span className={styles.error} role="alert">{error}</span>}
  </div>;
}
