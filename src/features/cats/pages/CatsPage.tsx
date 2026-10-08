import { ManagementPageHeader } from "../../../components/ui/ManagementPageHeader/ManagementPageHeader";
import type { Cat, CatForm } from "../cat.types";
import { useEffect, useState } from "react";
import {
  getCats,
  createCat,
  deleteCat,
  updateCat,
} from "../cat.service";

import { CatCard } from "../components/CatCard";
import { CatFormModal } from "../components/CatFormModal";
import { ConfirmModal } from "../../../components/ui/ConfirmModal/ConfirmModal";

function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [catToDelete, setCatToDelete] = useState<Cat | null>(null);

  // carregar gatos
  const loadCats = async () => {
    const data = await getCats();
    setCats(data);
  };

  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    getCats().then((data) => { if (active) setCats(data); })
      .catch(() => { if (active) setLoadError("Não foi possível carregar os dados."); });
    return () => { active = false; };
  }, []);

  const handleCreate = async (cat: CatForm) => {
    await createCat(cat);
    await loadCats();
  };

  const handleDelete = async () => {
    if (!catToDelete) return;

    await deleteCat(catToDelete.id);
    setCatToDelete(null);
    await loadCats();
  };

  const handleEdit = (cat: Cat) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const handleUpdate = async (cat: CatForm) => {
    if (cat.id === undefined) throw new Error("Registro sem identificador.");
    await updateCat(cat.id, cat);
    await loadCats();
  };
  

  return (
    <div>
      {loadError && <p role="alert">{loadError}</p>}
      {/* HEADER */}
      <ManagementPageHeader title="Gerenciar Gatinhos" addLabel="Adicionar novo Gatinho" onAdd={() => { setSelectedCat(null); setIsModalOpen(true); }} />

      {/* LISTA */}
      <div className="list-box">
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onDelete={() => setCatToDelete(cat)}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <CatFormModal
          key={selectedCat?.id ?? "new"}
          catToEdit={selectedCat}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCat(null);
          }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
      {catToDelete && (
        <ConfirmModal
          title="Excluir Gatinho"
          message="Tem certeza que deseja excluir este gatinho da lista?"
          onCancel={() => setCatToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default CatsPage;