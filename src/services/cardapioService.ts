const API_URL = "http://localhost:8080/cardapio";

export const getItensCardapio = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Erro ao buscar itens do cardápio");
  }

  return res.json();
};

export const createItemCardapio = async (item: any) => {
  const formData = new FormData();

  formData.append("nome", item.nome);
  formData.append("descricao", item.descricao);
  formData.append("preco", item.preco.toString());
  formData.append("categoria", item.categoria);

  if (item.imagem instanceof File) {
    formData.append("imagem", item.imagem);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao cadastrar item");
  }

  return res.json();
};

export const updateItemCardapio = async (
  id: number,
  item: any
) => {
  const formData = new FormData();

  formData.append("nome", item.nome);
  formData.append("descricao", item.descricao);
  formData.append("preco", item.preco.toString());
  formData.append("categoria", item.categoria);

  if (item.imagem instanceof File) {
    formData.append("imagem", item.imagem);
  }

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar item");
  }

  return res.json();
};

export const deleteItemCardapio = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao excluir item");
  }
};