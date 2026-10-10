export const PROFILE_LIMITS = { nome: 100, email: 254, cpf: 14, telefone: 20, cidade: 100, estado: 2, rua: 150, numero: 10 } as const;
// BCrypt accepts up to 72 UTF-8 bytes. Stop extra input without exposing this technical detail in the UI.
export function limitPassword(value: string) {
  let result = "";
  for (const character of value) {
    if (new TextEncoder().encode(result + character).length > 72) break;
    result += character;
  }
  return result;
}
