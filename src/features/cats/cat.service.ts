import type { CatForm, Cat } from "./cat.types";
import { API_BASE_URL, apiFetch } from "../../services/api";
const API_URL = `${API_BASE_URL}/cats`;

export const getCats = async (): Promise<Cat[]> => {
  const res = await apiFetch(API_URL);
  return res.json();
};

export const createCat = async (cat: CatForm) => {
  const formData = new FormData();

  formData.append("nome", cat.nome);
  formData.append("idade", cat.idade);  
  formData.append("genero", cat.genero);
  formData.append("tipoAdocao", cat.tipoAdocao);
  formData.append("descricao", cat.descricao);
  formData.append("status", cat.status);

  if (cat.foto instanceof File) {
    formData.append("foto", cat.foto);
  }

  const res = await apiFetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const updateCat = async (id: number, cat: CatForm) => {
  const formData = new FormData();

  formData.append("nome", cat.nome);
  formData.append("idade", cat.idade);
  formData.append("genero", cat.genero);
  formData.append("tipoAdocao", cat.tipoAdocao);
  formData.append("descricao", cat.descricao);
  formData.append("status", cat.status);

  if (cat.foto instanceof File) {
    formData.append("foto", cat.foto);
  }

  const res = await apiFetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
};

export const deleteCat = async (id: number) => {
  await apiFetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};