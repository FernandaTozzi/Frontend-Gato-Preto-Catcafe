import type { Cat } from "../cat.types";
import { API_BASE_URL } from "../../../services/api";
import defaultCat from "../../../assets/cat.png";
import { ManagementCard } from "../../../components/ui/ManagementCard/ManagementCard";

export function CatCard({
  cat,
  onDelete,
  onEdit,
}: { cat: Cat; onDelete: (id: number) => void; onEdit: (value: Cat) => void }) {
  const calcularIdade = (dataNascimento: string) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    if (hoje.getDate() < nascimento.getDate()) {
      meses--;

      if (meses < 0) {
        anos--;
        meses += 12;
      }
    }

    if (anos <= 0) {
      return `${meses} ${meses === 1 ? "mês" : "meses"}`;
    }

    if (meses === 0) {
      return `${anos} ${anos === 1 ? "ano" : "anos"}`;
    }

    return `${anos} ${
      anos === 1 ? "ano" : "anos"
    } e ${meses} ${meses === 1 ? "mês" : "meses"}`;
  };

  const imagem = cat.foto
    ? `${API_BASE_URL}/uploads/${cat.foto}`
    : defaultCat;

  const tipoAdocao =
    cat.tipoAdocao.charAt(0) +
    cat.tipoAdocao.slice(1).toLowerCase();

  const status =
    cat.status === "DISPONIVEL"
      ? "Disponível"
      : "Adotado";

  return (
    <ManagementCard
      image={imagem}
      imageAlt={cat.nome}
      title={
        <>
          {cat.nome} {cat.genero === "MACHO" ? "♂" : "♀"}
        </>
      }
      subtitle={
        <strong>{calcularIdade(cat.idade)}</strong>
      }
      badges={[
        {
          label: tipoAdocao,
          backgroundColor: "#7c75a3",
        },
        {
          label: status,
          backgroundColor:
            cat.status === "DISPONIVEL"
              ? "#31b869"
              : "#e57373",
        },
      ]}
      description={cat.descricao}
      onEdit={() => onEdit(cat)}
      onDelete={() => onDelete(cat.id)}
    />
  );
}