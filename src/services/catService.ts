const API_URL = "http://localhost:8080/cats";

//Método Get
export const getCats = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

//Método Post
export const createCat = async (cat: any) => {
  const formData = new FormData();

  formData.append("nome", cat.nome);
  formData.append("idade", cat.idade);
  formData.append("genero", cat.genero);
  formData.append("tipoAdocao", cat.tipoAdocao);
  formData.append("descricao", cat.descricao);
  formData.append("status", cat.status);
  formData.append("foto", cat.foto); // 👈 arquivo real

  const res = await fetch("http://localhost:8080/cats", {
    method: "POST",
    body: formData,
  });

  return res.json();
};
//Método Delete
export const deleteCat = async (id: number) => {
  await fetch(`http://localhost:8080/cats/${id}`, {
    method: "DELETE",
  });
};

//Método Update
export const updateCat = async (id: number, cat: any) => {
  const res = await fetch(`http://localhost:8080/cats/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat),
  });

  return res.json();
};