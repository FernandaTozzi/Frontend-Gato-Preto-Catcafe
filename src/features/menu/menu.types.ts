export interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: string | number;
  categoria: string;
  imagem?: string | null;
}

export type MenuItemForm = Omit<MenuItem, "id" | "imagem"> & { id?: number;
  imagem: File | null };
