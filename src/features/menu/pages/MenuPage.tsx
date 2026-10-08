import { ManagementPageHeader } from "../../../components/ui/ManagementPageHeader/ManagementPageHeader";
import type { MenuItem, MenuItemForm } from "../menu.types";
import { useEffect, useState } from "react";

import {
  getMenuItems,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from "../menu.service";

import { MenuItemCard } from "../components/MenuItemCard";
import { MenuItemFormModal } from "../components/MenuItemFormModal";

function MenuPage() {
  const [itens, setItens] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const loadItens = async () => {
    const data = await getMenuItems();
    setItens(data);
  };

  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    getMenuItems().then((data) => { if (active) setItens(data); })
      .catch(() => { if (active) setLoadError("Não foi possível carregar os dados."); });
    return () => { active = false; };
  }, []);

  const handleCreate = async (item: MenuItemForm) => {
    await createMenuItem(item);
    await loadItens();
  };

  const handleDelete = async (id: number) => {
    await deleteMenuItem(id);
    await loadItens();
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdate = async (item: MenuItemForm) => {
    if (item.id === undefined) throw new Error("Registro sem identificador.");
    await updateMenuItem(item.id, item);
    await loadItens();
  };

  return (
    <div>
      {loadError && <p role="alert">{loadError}</p>}
      <ManagementPageHeader title="Gerenciar Cardápio" addLabel="Adicionar novo Item" onAdd={() => { setSelectedItem(null); setIsModalOpen(true); }} />

      <div className="list-box">
        {itens.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {isModalOpen && (
        <MenuItemFormModal
          key={selectedItem?.id ?? "new"}
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

export default MenuPage;