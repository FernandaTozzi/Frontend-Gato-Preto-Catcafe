import type { MenuItem } from "../menu.types";
import { API_BASE_URL } from "../../../services/api";
import defaultImage from "../../../assets/cardapio.png";
import { ManagementCard } from "../../../components/ui/ManagementCard/ManagementCard";

export function MenuItemCard({
  item,
  onDelete,
  onEdit,
}: { item: MenuItem; onDelete: (id: number) => void; onEdit: (value: MenuItem) => void }) {
  const imagem = item.imagem
    ? `${API_BASE_URL}/uploads/${item.imagem}`
    : defaultImage;

  return (
    <ManagementCard
      image={imagem}
      imageAlt={item.nome}
      title={item.nome}
      badges={[
        {
          label: item.categoria,
          backgroundColor: "#7c75a3",
        },
      ]}
      description={item.descricao}
      extraContent={
        <strong>
          R$ {Number(item.preco).toFixed(2).replace(".", ",")}
        </strong>
      }
      onEdit={() => onEdit(item)}
      onDelete={() => onDelete(item.id)}
    />
  );
}