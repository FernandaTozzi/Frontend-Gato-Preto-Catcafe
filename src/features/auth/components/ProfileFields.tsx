import { useEffect, useState } from "react";
import { AuthField, AuthSelect } from "../../../components/ui/AuthField/AuthField";
import type { ProfileForm, FormErrors } from "../auth.validation";
import styles from "./AuthLayout.module.css";
const STATES = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");
export function ProfileFields({ form, errors, change, disabled, passwordField }: { form: ProfileForm; errors: FormErrors; change: (key: keyof ProfileForm, value: string) => void; disabled: boolean; passwordField?: React.ReactNode }) {
  const [cities, setCities] = useState<{ uf: string; names: string[] } | null>(null);
  useEffect(() => {
    if (!form.estado) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado}/municipios?orderBy=nome`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json() as Promise<{ nome: string }[]>; })
      .then(data => { setCities({ uf: form.estado, names: data.map(city => city.nome) }); })
      .catch(() => {}).finally(() => window.clearTimeout(timeout));
    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, [form.estado]);
  return <>
    <AuthField label="Nome" autoComplete="name" value={form.nome} onChange={e => change("nome", e.target.value)} error={errors.nome} disabled={disabled} maxLength={100} />
    <AuthField label="E-mail" type="email" autoComplete="email" value={form.email} onChange={e => change("email", e.target.value)} error={errors.email} disabled={disabled} maxLength={254} />
    <AuthField label="CPF" inputMode="numeric" value={form.cpf} onChange={e => change("cpf", e.target.value)} error={errors.cpf} disabled={disabled} maxLength={14} />
    {passwordField}
    <AuthField label="Telefone" type="tel" autoComplete="tel" value={form.telefone} onChange={e => change("telefone", e.target.value)} error={errors.telefone} disabled={disabled} maxLength={20} />
    <div className={styles.row}><AuthField label="Cidade" autoComplete="address-level2" list="auth-cities" value={form.cidade} onChange={e => change("cidade", e.target.value)} error={errors.cidade} disabled={disabled} />
      <datalist id="auth-cities">{cities?.uf === form.estado && cities.names.map(city => <option key={city} value={city} />)}</datalist>
      <AuthSelect label="Estado" autoComplete="address-level1" value={form.estado} onChange={e => change("estado", e.target.value)} error={errors.estado} disabled={disabled}>{STATES.map(uf => <option key={uf} value={uf}>{uf}</option>)}</AuthSelect></div>
    <div className={`${styles.row} ${styles.street}`}><AuthField label="Rua" autoComplete="street-address" value={form.rua} onChange={e => change("rua", e.target.value)} error={errors.rua} disabled={disabled} /><AuthField label="Nº" inputMode="numeric" value={form.numero} onChange={e => change("numero", e.target.value)} error={errors.numero} disabled={disabled} /></div>
  </>;
}
