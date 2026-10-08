import { API_BASE_URL, apiFetch } from "../../services/api";
import type { DonationAccount } from "./donation.types";
const API_URL = `${API_BASE_URL}/doacao`;

export async function getDonationAccount(): Promise<DonationAccount> {
  const response = await apiFetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar conta para doações.");
  }

  return response.json();
}

export async function updateDonationAccount(
  conta: DonationAccount
): Promise<DonationAccount> {
  const response = await apiFetch(API_URL, {
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