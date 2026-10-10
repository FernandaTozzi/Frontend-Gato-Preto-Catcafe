import { PROFILE_LIMITS, limitPassword } from "../../auth/inputLimits";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { useAuth } from "../../auth/useAuth";
import { emptyProfile, mapApiError, profilePayload, validateProfile } from "../../auth/auth.validation";
import type { ProfileForm, FormErrors } from "../../auth/auth.validation";
import { apiJson, clearCsrf } from "../../../services/api";
import styles from "./ProfilePage.module.css";
const states = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");
export default function ProfilePage() {
  const { user, reload, signOut } = useAuth(); const navigate = useNavigate();
  const [form, setForm] = useState<ProfileForm>(() => user ? { nome: user.nome, email: user.email, cpf: user.cpf, telefone: user.telefone, cidade: user.endereco?.cidade || "", estado: user.endereco?.estado || "", rua: user.endereco?.rua || "", numero: user.endereco ? String(user.endereco.numero) : "" } : emptyProfile);
  const [editing, setEditing] = useState(false); const [password, setPassword] = useState(""); const [currentPassword, setCurrentPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({}); const [message, setMessage] = useState(""); const [success, setSuccess] = useState(""); const [busy, setBusy] = useState(false);
  const change = (key: keyof ProfileForm, value: string) => { setForm(f => ({ ...f, [key]: value })); setErrors(e => ({ ...e, [key]: "" })); setMessage(""); setSuccess(""); };
  const field = (key: keyof ProfileForm, label: string, fixed = false, props: InputHTMLAttributes<HTMLInputElement> = {}) => <div className={styles.field}><label htmlFor={`profile-${key}`}>{label}</label><div className={styles.control}><input {...props} maxLength={PROFILE_LIMITS[key]} id={`profile-${key}`} value={form[key]} readOnly={fixed || !editing} disabled={busy} className={`${styles.input} ${fixed ? styles.fixed : ""}`} onChange={e => change(key, e.target.value)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `error-${key}` : undefined} />{errors[key] && <p className={styles.error} id={`error-${key}`} role="alert">{errors[key]}</p>}</div></div>;
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy || !editing) return;
    const next = validateProfile(form, password || undefined);
    if (password && !currentPassword) next.senhaAtual = "Informe sua senha atual.";
    if (currentPassword && !password) next.novaSenha = "Informe a nova senha.";
    if (next.senha) { next.novaSenha = next.senha; delete next.senha; }
    setErrors(next); setMessage(""); setSuccess(""); if (Object.keys(next).length) return;
    setBusy(true);
    try { await apiJson("/perfil", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...profilePayload(form), ...(password ? { senhaAtual: currentPassword, novaSenha: password } : {}) }) }); if (password) { clearCsrf(); await reload(); navigate("/login", {replace:true,state:{passwordChanged:true}}); return; } await reload(); setPassword(""); setCurrentPassword(""); setEditing(false); setSuccess("Informações atualizadas com sucesso!"); }
    catch (e) { const mapped = mapApiError(e); if (/senha atual/i.test(mapped.message)) { mapped.fields.senhaAtual = mapped.message; mapped.message = ""; } setErrors(mapped.fields); setMessage(mapped.message); }
    finally { setBusy(false); }
  };
  return <section className={styles.page}><h1>Meu Perfil</h1><form onSubmit={submit} noValidate aria-busy={busy}>
    {field("nome", "Nome:", true, {autoComplete:"name"})}{field("email", "E-mail:", true, {type:"email"})}{field("cpf", "CPF:", true)}
    <div className={styles.field}><label htmlFor="profile-password">{editing ? "Nova senha:" : "Senha:"}</label><div className={styles.control}><input maxLength={72} id="profile-password" className={styles.input} type="password" autoComplete="new-password" value={editing ? password : "********"} readOnly={!editing} disabled={busy} placeholder={editing ? "Deixe em branco para manter" : ""} onChange={e => { setPassword(limitPassword(e.target.value)); setErrors(v => ({...v, novaSenha:""})); }} aria-invalid={!!errors.novaSenha} aria-describedby={errors.novaSenha ? "error-novaSenha" : undefined}/>{errors.novaSenha && <p id="error-novaSenha" className={styles.error} role="alert">{errors.novaSenha}</p>}</div></div>
    {editing && <div className={styles.field}><label htmlFor="profile-current">Senha atual:</label><div className={styles.control}><input maxLength={72} id="profile-current" className={styles.input} type="password" autoComplete="current-password" value={currentPassword} disabled={busy} placeholder="Preencha apenas para trocar a senha" onChange={e => {setCurrentPassword(limitPassword(e.target.value));setErrors(v=>({...v,senhaAtual:""}));}} aria-invalid={!!errors.senhaAtual} aria-describedby={errors.senhaAtual ? "error-senhaAtual" : undefined}/>{errors.senhaAtual && <p id="error-senhaAtual" className={styles.error} role="alert">{errors.senhaAtual}</p>}</div></div>}
    {field("telefone", "Telefone:", false, {type:"tel", autoComplete:"tel"})}
    <div className={styles.field}><label htmlFor="profile-cidade">Cidade:</label><div className={styles.address}><div className={styles.control}><input maxLength={100} id="profile-cidade" className={styles.input} value={form.cidade} readOnly={!editing} disabled={busy} autoComplete="address-level2" onChange={e=>change("cidade",e.target.value)} aria-invalid={!!errors.cidade}/>{errors.cidade && <p className={styles.error} role="alert">{errors.cidade}</p>}</div><div className={styles.control}><select aria-label="Estado" className={styles.input} value={form.estado} disabled={!editing || busy} onChange={e=>change("estado",e.target.value)} aria-invalid={!!errors.estado}><option value="">Estado</option>{states.map(uf=><option key={uf}>{uf}</option>)}</select>{errors.estado && <p className={styles.error} role="alert">{errors.estado}</p>}</div></div></div>
    <div className={styles.street}>{field("rua", "Rua:", false, {autoComplete:"street-address"})}{field("numero", "Nº:", false, {inputMode:"numeric"})}</div>
    {message && <p className={styles.error} role="alert">{message}</p>}{success && <p className={styles.success} role="status">{success}</p>}
    <div className={styles.actions}><button type="button" className={styles.button} disabled={busy || editing} onClick={()=>{setEditing(true);setSuccess("");setMessage("");}}>EDITAR INFORMAÇÕES <span aria-hidden="true">✎</span></button>{editing ? <button type="submit" className={styles.button} disabled={busy}>{busy ? "Salvando…" : "Salvar"}</button> : <button type="button" className={styles.logout} disabled={busy} onClick={async()=>{setBusy(true);try{await signOut();}catch(e){setMessage(mapApiError(e).message);}finally{setBusy(false);}}}>sair da conta</button>}</div>
  </form></section>;
}
