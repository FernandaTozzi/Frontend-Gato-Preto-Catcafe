import { useEffect, useState } from "react";

import {
  getItensCardapio,
  createItemCardapio,
  deleteItemCardapio,
  updateItemCardapio,
} from "../services/cardapioService";

import { ItemCardapioCard } from "../components/ItemCardapioCard";
import { ItemCardapioModal } from "../components/ItemCardapioModal";

function CardapioPage() {
  const [itens, setItens] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const loadItens = async () => {
    const data = await getItensCardapio();
    setItens(data);
  };

  useEffect(() => {
    loadItens();
  }, []);

  const handleCreate = async (item: any) => {
    await createItemCardapio(item);
    await loadItens();
  };

  const handleDelete = async (id: number) => {
    await deleteItemCardapio(id);
    await loadItens();
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdate = async (item: any) => {
    await updateItemCardapio(item.id, item);
    await loadItens();
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">
          Gerenciar Cardápio
        </h1>

        <button
          className="add-button"
          onClick={() => {
            setSelectedItem(null);
            setIsModalOpen(true);
          }}
        >
          + Adicionar novo Item
        </button>
      </div>

      <div className="list-box">
        {itens.map((item) => (
          <ItemCardapioCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {isModalOpen && (
        <ItemCardapioModal
          itemToEdit={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default CardapioPage;