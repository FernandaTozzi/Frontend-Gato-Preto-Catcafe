export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");
export class ApiError extends Error {
  status: number;
  fields: Record<string, string>;
  constructor(status: number, message: string, fields: Record<string, string> = {}) { super(message); this.status = status; this.fields = fields; }
}
let csrf: { token: string; headerName: string } | null = null;
let csrfRequest: Promise<void> | null = null;
export function clearCsrf() { csrf = null; }
async function parseError(response: Response): Promise<never> {
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) { clearCsrf(); window.dispatchEvent(new Event("auth:expired")); }
  if (response.status === 403 && /csrf/i.test(data.mensagem || "")) clearCsrf();
  throw new ApiError(response.status, data.mensagem || "Não foi possível concluir a solicitação.", data.campos || {});
}
export async function refreshCsrf() {
  if (!csrfRequest) csrfRequest = (async () => {
    let res: Response;
    try { res = await fetch(`${API_BASE_URL}/auth/csrf`, { credentials: "include" }); }
    catch { throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique se o backend está ligado."); }
    if (!res.ok) await parseError(res);
    csrf = await res.json();
  })().finally(() => { csrfRequest = null; });
  return csrfRequest;
}
export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const method = (init.method || "GET").toUpperCase();
  const headers = new Headers(init.headers);
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    if (!csrf) await refreshCsrf();
    headers.set(csrf!.headerName, csrf!.token);
  }
  let response: Response;
  try { response = await fetch(input, { ...init, headers, credentials: "include" }); }
  catch { throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique se o backend está ligado."); }
  if (!response.ok) await parseError(response);
  return response;
}
export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await apiFetch(`${API_BASE_URL}${path}`, init);
  return response.status === 204 ? undefined as T : response.json();
}
