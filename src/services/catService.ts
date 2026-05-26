const API_URL = "http://localhost:8080/cats";

export const getCats = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createCat = async (cat: any) => {
  const formData = new FormData();

  formData.append("nome", cat.nome);
  formData.append("idade", String(cat.idade));
  formData.append("genero", cat.genero);
  formData.append("tipoAdocao", cat.tipoAdocao);
  formData.append("descricao", cat.descricao);
  formData.append("status", cat.status);

  if (cat.foto instanceof File) {
    formData.append("foto", cat.foto);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const updateCat = async (id: number, cat: any) => {
  const formData = new FormData();

  formData.append("nome", cat.nome);
  formData.append("idade", String(cat.idade));
  formData.append("genero", cat.genero);
  formData.append("tipoAdocao", cat.tipoAdocao);
  formData.append("descricao", cat.descricao);
  formData.append("status", cat.status);

  if (cat.foto instanceof File) {
    formData.append("foto", cat.foto);
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  return res.json();
};

export const deleteCat = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};