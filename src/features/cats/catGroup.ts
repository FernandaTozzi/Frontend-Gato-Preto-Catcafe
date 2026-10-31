import type { Cat } from "./cat.types";

export type CatGender = "MACHO" | "FEMEA";
export type GroupMember = { nome: string; genero: CatGender };

const isGender = (value: string): value is CatGender =>
  value === "MACHO" || value === "FEMEA";

// Mantém compatibilidade com os registros simples já existentes.
export function readCatGroup(cat: Pick<Cat, "nome" | "genero" | "tipoAdocao">): GroupMember[] {
  const names = cat.nome.split("/").map((name) => name.trim());
  const genders = cat.genero.split("/").map((gender) => gender.trim().toUpperCase());

  if (cat.tipoAdocao !== "CONJUNTA") {
    return [{ nome: cat.nome, genero: isGender(cat.genero) ? cat.genero : "MACHO" }];
  }

  return names.map((nome, index) => ({
    nome,
    genero: isGender(genders[index] ?? "") ? (genders[index] as CatGender) : "MACHO",
  }));
}

export function encodeCatGroup(members: GroupMember[]) {
  return {
    nome: members.map((member) => member.nome.trim()).join("/"),
    genero: members.map((member) => member.genero).join("/"),
  };
}

export const availableCats = (cats: Cat[]) =>
  cats.filter((cat) => cat.status === "DISPONIVEL");
