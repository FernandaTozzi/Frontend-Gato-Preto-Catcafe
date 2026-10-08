import type { Activity } from "../activity.types";
import { API_BASE_URL } from "../../../services/api";
import defaultImage from "../../../assets/atividade-especial.png";
import { ManagementCard } from "../../../components/ui/ManagementCard/ManagementCard";

export function ActivityCard({
  atividade,
  onDelete,
  onEdit,
}: { atividade: Activity; onDelete: (id: number) => void; onEdit: (value: Activity) => void }) {
  const imagem = atividade.imagem
    ? `${API_BASE_URL}/uploads/${atividade.imagem}`
    : defaultImage;

  const dataFormatada = atividade.data
    ? new Date(`${atividade.data}T00:00:00`).toLocaleDateString("pt-BR")
    : "";

  const badges = [];

  if (atividade.data) {
    badges.push({
      label: `📅 ${dataFormatada}`,
      backgroundColor: "#7c75a3",
    });
  }

  if (atividade.horarioInicio && atividade.horarioFim) {
    badges.push({
      label: `Das ${atividade.horarioInicio.slice(
        0,
        5
      )} às ${atividade.horarioFim.slice(0, 5)}`,
      backgroundColor: "#e573c3",
    });
  }

  return (
    <ManagementCard
      image={imagem}
      imageAlt={atividade.titulo}
      title={atividade.titulo}
      badges={badges}
      description={atividade.descricao}
      onEdit={() => onEdit(atividade)}
      onDelete={() => onDelete(atividade.id)}
    />
  );
}