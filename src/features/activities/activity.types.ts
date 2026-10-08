export interface Activity {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  imagem?: string | null;
}

export type ActivityForm = Omit<Activity, "id" | "imagem"> & { id?: number;
  imagem: File | null };
