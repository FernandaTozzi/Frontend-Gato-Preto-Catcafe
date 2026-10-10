import { limitPassword } from "../../../features/auth/inputLimits";
import { useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import styles from "./AuthField.module.css";
type Common = { label: string; error?: string; icon?: ReactNode };
export function AuthField({ label, error, icon, ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return <div className={styles.field}><label className={styles.srOnly} htmlFor={id}>{label}</label>
    <div className={styles.control}>{icon && <span className={styles.icon}>{icon}</span>}
    <input {...props} maxLength={props.maxLength ?? ({ Nome: 100, "E-mail": 254, CPF: 14, Telefone: 20, Cidade: 100, Rua: 150, "Nº": 10, Senha: 72 } as Record<string, number>)[label] ?? 100} onChange={event => { if (props.type === "password") event.target.value = limitPassword(event.target.value); props.onChange?.(event); }} id={id} placeholder={props.placeholder || label} className={`${styles.input} ${icon ? styles.withIcon : ""} ${error ? styles.invalid : ""}`}
      aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} /></div>
    {error && <p className={styles.error} id={`${id}-error`} role="alert">{error}</p>}</div>;
}
export function AuthSelect({ label, error, children, ...props }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return <div className={styles.field}><label className={styles.srOnly} htmlFor={id}>{label}</label>
    <select {...props} id={id} className={`${styles.input} ${styles.select} ${error ? styles.invalid : ""}`} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}>
      <option value="">{label}</option>{children}</select>
    {error && <p className={styles.error} id={`${id}-error`} role="alert">{error}</p>}</div>;
}
