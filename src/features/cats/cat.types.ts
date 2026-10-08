export interface Cat {
  id: number;
  nome: string;
  idade: string;
  genero: string;
  tipoAdocao: string;
  descricao: string;
  status: string;
  foto?: string | null;
}

export type CatForm = Omit<Cat, "id" | "foto"> & { id?: number;
  foto: File | null };
