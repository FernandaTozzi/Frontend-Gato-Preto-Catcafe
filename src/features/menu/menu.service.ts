import type { MenuItemForm, MenuItem } from "./menu.types";
import { API_BASE_URL, apiFetch } from "../../services/api";
const API_URL = `${API_BASE_URL}/cardapio`;

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const res = await apiFetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar itens do cardápio");
  }

  return res.json();
};

export const createMenuItem = async (item: MenuItemForm) => {
  const formData = new FormData();

  formData.append("nome", item.nome);
  formData.append("descricao", item.descricao);
  formData.append("preco", item.preco.toString());
  formData.append("categoria", item.categoria);

  if (item.imagem instanceof File) {
    formData.append("imagem", item.imagem);
  }

  const res = await apiFetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao cadastrar item");
  }

  return res.json();
};

export const updateMenuItem = async (
  id: number,
  item: MenuItemForm
) => {
  const formData = new FormData();

  formData.append("nome", item.nome);
  formData.append("descricao", item.descricao);
  formData.append("preco", item.preco.toString());
  formData.append("categoria", item.categoria);

  if (item.imagem instanceof File) {
    formData.append("imagem", item.imagem);
  }

  const res = await apiFetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar item");
  }

  return res.json();
};

export const deleteMenuItem = async (id: number) => {
  const res = await apiFetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao excluir item");
  }
};