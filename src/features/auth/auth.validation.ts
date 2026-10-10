import { ApiError } from "../../services/api";
export type FormErrors = Record<string, string>;
export const digits = (value: string) => value.replace(/\D/g, "");
export const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function cpfValid(value: string) {
  const cpf = digits(value); if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (let length = 9; length <= 10; length++) {
    let sum = 0; for (let i = 0; i < length; i++) sum += Number(cpf[i]) * (length + 1 - i);
    const mod = sum * 10 % 11; if ((mod === 10 ? 0 : mod) !== Number(cpf[length])) return false;
  } return true;
}
export function mapApiError(error: unknown): { fields: FormErrors; message: string } {
  if (!(error instanceof ApiError)) return { fields: {}, message: error instanceof Error ? error.message : "Não foi possível concluir. Tente novamente." };
  const fields = Object.fromEntries(Object.entries(error.fields).map(([key, value]) => [key.replace("endereco.", ""), value]));
  if (error.status === 409 && !Object.keys(fields).length) {
    if (/telefone/i.test(error.message) && !/email|cpf/i.test(error.message)) fields.telefone = error.message;
    else if (/email/i.test(error.message) && !/CPF|telefone/i.test(error.message)) fields.email = error.message;
    else if (/cpf/i.test(error.message) && !/email|telefone/i.test(error.message)) fields.cpf = error.message;
    else { fields.email = "Confira se este email já está cadastrado."; fields.cpf = "Confira se este CPF já está cadastrado."; fields.telefone = "Confira se este telefone já está cadastrado."; }
  }
  return { fields, message: Object.keys(fields).length ? "" : error.message };
}
export interface ProfileForm { nome: string; email: string; cpf: string; telefone: string; cidade: string; estado: string; rua: string; numero: string; }
export const emptyProfile: ProfileForm = { nome: "", email: "", cpf: "", telefone: "", cidade: "", estado: "", rua: "", numero: "" };
export function validateProfile(form: ProfileForm, password?: string) {
  const errors: FormErrors = {};
  if (form.nome.trim().length < 2 || form.nome.trim().length > 100) errors.nome = "Informe um nome com 2 a 100 caracteres.";
  if (!emailValid(form.email) || form.email.trim().length > 254) errors.email = "Email inválido.";
  if (!cpfValid(form.cpf)) errors.cpf = "CPF inválido.";
  if (!/^(?:\+55[ -]?)?\(?[1-9][0-9]\)?[ -]?[0-9]{4,5}[ -]?[0-9]{4}$/.test(form.telefone)) errors.telefone = "Informe um telefone válido com DDD.";
  if (password !== undefined && (password.length < 8 || new TextEncoder().encode(password).length > 72)) errors.senha = "Use pelo menos 8 caracteres.";
  const hasAddress = [form.cidade, form.estado, form.rua, form.numero].some(Boolean);
  if (hasAddress) {
    if (!form.estado) errors.estado = "Selecione o estado.";
    if (!form.cidade.trim() || form.cidade.trim().length > 100) errors.cidade = "Informe uma cidade válida.";
    if (!form.rua.trim() || form.rua.trim().length > 150) errors.rua = "Informe uma rua válida.";
    if (!/^\d+$/.test(form.numero) || Number(form.numero) > 2147483647) errors.numero = "Informe um número válido; use 0 para s/n.";
  }
  return errors;
}
export function profilePayload(form: ProfileForm) {
  return { nome: form.nome.trim(), email: form.email.trim(), cpf: digits(form.cpf), telefone: form.telefone,
    endereco: [form.cidade, form.estado, form.rua, form.numero].some(Boolean) ? { cidade: form.cidade.trim(), estado: form.estado, rua: form.rua.trim(), numero: Number(form.numero) } : null };
}
