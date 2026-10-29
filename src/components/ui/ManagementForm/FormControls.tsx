import { useId } from "react";
import type { ReactNode } from "react";
import styles from "./ManagementForm.module.css";

type FieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  children: (id: string) => ReactNode;
};

export function Field({ label, error, required = true, children }: FieldProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label id={`${id}-label`} className={styles.label} htmlFor={id}>{label}{required && <span className={styles.required}> *</span>}</label>
      {children(id)}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

export function Options({ label, value, options, onChange, error }: {
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
  error?: string;
}) {
  const id = useId();
  return (
    <div className={styles.field} role="group" aria-labelledby={id}>
      <span id={id} className={styles.label}>{label} <span className={styles.required}>*</span></span>
      <div className={styles.options}>
        {options.map(([key, text]) => <button key={key} type="button" className={`${styles.option} ${value === key ? styles.active : ""}`} aria-pressed={value === key} onClick={() => onChange(key)}>{text}</button>)}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

export function FormActions({ saving, onClose }: { saving: boolean; onClose: () => void }) {
  return <div className={styles.actions}><button className={styles.cancel} type="button" disabled={saving} onClick={onClose}>Cancelar</button><button className={styles.save} type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</button></div>;
}
