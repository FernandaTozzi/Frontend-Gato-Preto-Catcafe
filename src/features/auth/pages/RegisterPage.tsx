import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { ProfileFields } from "../components/ProfileFields";
import { AuthField } from "../../../components/ui/AuthField/AuthField";
import { emptyProfile, validateProfile, profilePayload, mapApiError } from "../auth.validation";
import type { FormErrors, ProfileForm } from "../auth.validation";
import { register } from "../auth.service";
import { useAuth } from "../useAuth";
import styles from "../components/AuthLayout.module.css";
export default function RegisterPage() {
  const { user } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState({ ...emptyProfile }); const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({}); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/perfil" replace />;
  const change = (key: keyof ProfileForm, value: string) => { setForm(f => ({ ...f, [key]: value })); setErrors(e => ({ ...e, [key]: "" })); setMessage(""); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy) return; const next = validateProfile(form, password); setErrors(next); setMessage(""); if (Object.keys(next).length) return;
    setBusy(true);
    try { await register({ ...profilePayload(form), senha: password }); navigate("/login", { replace: true, state: { registered: true } }); }
    catch (e) { const mapped = mapApiError(e); setErrors(mapped.fields); setMessage(mapped.message); }
    finally { setBusy(false); }
  };
  return <AuthLayout title="CRIAR CONTA" subtitle="Registre-se com seu e-mail"><form className={styles.form} onSubmit={submit} noValidate aria-busy={busy}>
    <ProfileFields form={form} errors={errors} change={change} disabled={busy} passwordField={<AuthField label="Senha" type="password" autoComplete="new-password" value={password} onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, senha: "" })); setMessage(""); }} error={errors.senha} disabled={busy} />} />
    {message && <p className={styles.alert} role="alert">{message}</p>}
    <button className={styles.submit} disabled={busy}>{busy ? "Cadastrando…" : "Cadastrar"}</button>
  </form><p className={styles.switch}>Já possui Cadastro? <Link to="/login">Faça Login</Link></p><Link className={styles.back} to="/">Voltar para o site</Link></AuthLayout>;
}
