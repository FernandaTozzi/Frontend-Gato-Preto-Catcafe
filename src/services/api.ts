export const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");

/** Keeps multipart boundaries and existing backend payloads unchanged. */
export async function apiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init);
  if (!response.ok) throw new Error(`Erro na API (${response.status}).`);
  return response;
}
