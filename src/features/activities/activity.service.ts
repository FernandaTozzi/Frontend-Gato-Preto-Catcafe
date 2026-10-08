import type { ActivityForm, Activity } from "./activity.types";
import { API_BASE_URL, apiFetch } from "../../services/api";
const API_URL = `${API_BASE_URL}/atividades`;

export const getActivities = async (): Promise<Activity[]> => {
  const res = await apiFetch(API_URL);
  return res.json();
};

export const createActivity = async (atividade: ActivityForm) => {
  const formData = new FormData();

  formData.append("titulo", atividade.titulo);
  formData.append("descricao", atividade.descricao);
  formData.append("data", atividade.data);
  formData.append("horarioInicio", atividade.horarioInicio);
  formData.append("horarioFim", atividade.horarioFim);

  if (atividade.imagem instanceof File) {
    formData.append("imagem", atividade.imagem);
  }

  const res = await apiFetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const updateActivity = async (id: number, atividade: ActivityForm) => {
  const formData = new FormData();

  formData.append("titulo", atividade.titulo);
  formData.append("descricao", atividade.descricao);
  formData.append("data", atividade.data);
  formData.append("horarioInicio", atividade.horarioInicio);
  formData.append("horarioFim", atividade.horarioFim);

  if (atividade.imagem instanceof File) {
    formData.append("imagem", atividade.imagem);
  }

  const res = await apiFetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
};

export const deleteActivity = async (id: number) => {
  await apiFetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};