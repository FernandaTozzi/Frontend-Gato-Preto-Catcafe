const API_URL = "http://localhost:8080/atividades";

export const getAtividades = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createAtividade = async (atividade: any) => {
  const formData = new FormData();

  formData.append("titulo", atividade.titulo);
  formData.append("descricao", atividade.descricao);
  formData.append("inicioEvento", atividade.inicioEvento);
  formData.append("fimEvento", atividade.fimEvento);

  if (atividade.imagem instanceof File) {
    formData.append("imagem", atividade.imagem);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const updateAtividade = async (id: number, atividade: any) => {
  const formData = new FormData();

  formData.append("titulo", atividade.titulo);
  formData.append("descricao", atividade.descricao);
  formData.append("inicioEvento", atividade.inicioEvento);
  formData.append("fimEvento", atividade.fimEvento);

  if (atividade.imagem instanceof File) {
    formData.append("imagem", atividade.imagem);
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
};

export const deleteAtividade = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};