export interface Cat {
  id: number;
  nome: string;
  idade: string;
  genero: string;
  tipoAdocao: string;
  descricao: string;
  status: string;
  fotos?: string[];
  foto?: string | null;
}

export type CatForm = Omit<Cat, "id" | "foto" | "fotos"> & {
  id?: number;
  foto: File | null;
  fotos?: File[];
  fotosMantidas?: string[];
};
