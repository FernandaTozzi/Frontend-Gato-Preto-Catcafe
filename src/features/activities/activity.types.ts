export interface Activity {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  imagens?: string[];
  imagem?: string | null;
}

export type ActivityForm = Omit<Activity, "id" | "imagem" | "imagens"> & {
  id?: number;
  imagem: File | null;
  imagens?: File[];
  imagensMantidas?: string[];
};
