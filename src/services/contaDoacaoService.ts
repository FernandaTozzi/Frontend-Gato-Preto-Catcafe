export type ContaDoacao = {
  id?: number;
  banco: string;
  agencia: string;
  conta: string;
  chavePix: string;
  titular: string;
};

const API_URL = "http://localhost:8080/doacao";

export async function buscarContaDoacao(): Promise<ContaDoacao> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar conta para doações.");
  }

  return response.json();
}

export async function atualizarContaDoacao(
  conta: ContaDoacao
): Promise<ContaDoacao> {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conta),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar conta para doações.");
  }

  return response.json();
}