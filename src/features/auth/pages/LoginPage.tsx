import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { AuthField } from "../../../components/ui/AuthField/AuthField";
import { useAuth } from "../useAuth";
import { emailValid, mapApiError } from "../auth.validation";
import type { FormErrors } from "../auth.validation";
import styles from "../components/AuthLayout.module.css";
export default function LoginPage() {
  const { user, signIn } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({}); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false); const [forgot, setForgot] = useState(false);
  if (user) {
    const from = (location.state as { from?: string } | null)?.from;
    const allowed = from && from.startsWith("/") && !from.startsWith("//") && !["/login", "/cadastro"].includes(from) && (from === "/gerenciar/perfil" || !from.startsWith("/gerenciar") || user.tipoUsuario === "ADM");
    return <Navigate to={allowed ? from : user.tipoUsuario === "ADM" ? "/gerenciar" : "/"} replace />;
  }
  const clear = (field: string) => { setErrors(e => ({ ...e, [field]: "" })); setMessage(""); };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy) return;
    const next: FormErrors = {}; if (!emailValid(email)) next.email = "Email inválido."; if (!password) next.senha = "Informe sua senha.";
    setErrors(next); setMessage(""); if (Object.keys(next).length) return;
    setBusy(true);
    try {
      const current = await signIn(email, password);
      const from = (location.state as { from?: string } | null)?.from;
      const allowed = from && from.startsWith("/") && !from.startsWith("//") && (from === "/gerenciar/perfil" || !from.startsWith("/gerenciar") || current.tipoUsuario === "ADM");
      navigate(allowed ? from : current.tipoUsuario === "ADM" ? "/gerenciar" : "/", { replace: true });
    } catch (e) { const mapped = mapApiError(e); setErrors(mapped.fields); setMessage(mapped.message); if (mapped.message === "Email ou senha inválidos.") setErrors({ email: "Confira seu email.", senha: "Email ou senha inválidos." }); }
    finally { setBusy(false); }
  };
  return <AuthLayout title="FAZER LOGIN" subtitle="Faça login com seu e-mail"><form className={styles.form} onSubmit={submit} noValidate aria-busy={busy}>
    {(location.state as { passwordChanged?: boolean } | null)?.passwordChanged && <p className={styles.notice} role="status">Senha alterada! Entre novamente com sua nova senha.</p>}
    {(location.state as { registered?: boolean } | null)?.registered && <p className={styles.notice} role="status">Conta criada! Entre com seu email e senha.</p>}
    <AuthField label="E-mail" type="email" autoComplete="username" value={email} onChange={e => { setEmail(e.target.value); clear("email"); }} error={errors.email} disabled={busy} icon={<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4h20v16H2z"/><path d="m3 5 9 8 9-8" fill="none" stroke="white" strokeWidth="2"/></svg>} />
    <AuthField label="Senha" type="password" autoComplete="current-password" value={password} onChange={e => { setPassword(e.target.value); clear("senha"); }} error={errors.senha} disabled={busy} icon={<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 10V7a6 6 0 0 1 12 0v3h2v12H4V10zm3 0h6V7a3 3 0 0 0-6 0z"/></svg>} />
    <button className={styles.forgot} type="button" onClick={() => setForgot(!forgot)}>Esqueceu a senha?</button>
    {forgot && <p className={styles.notice} role="status">A recuperação de senha ainda não está disponível. Entre em contato com a administração do Cat Café.</p>}
    {message && <p className={styles.alert} role="alert">{message}</p>}
    <button className={`${styles.submit} ${styles.loginSubmit}`} disabled={busy}>{busy ? "Entrando…" : "ENTRAR"}</button>
  </form><p className={styles.switch}>Não possui conta? <Link to="/cadastro">Cadastre Aqui</Link></p><Link className={styles.back} to="/">Voltar para o site</Link></AuthLayout>;
}
