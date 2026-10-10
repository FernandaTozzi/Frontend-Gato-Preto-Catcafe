import { apiJson, clearCsrf } from "../../services/api";
import type { User, Registration } from "./auth.types";
export const getSession = () => apiJson<User>("/auth/me");
export async function login(email: string, senha: string) {
  const user = await apiJson<User>("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), senha }) });
  clearCsrf(); return user;
}
export const register = (data: Registration) => apiJson<User>("/auth/cadastro", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
export async function logout() { await apiJson<void>("/auth/logout", { method: "POST" }); clearCsrf(); }
