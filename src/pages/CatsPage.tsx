import { useEffect, useState } from "react";
import {
  getCats,
  createCat,
  deleteCat,
  updateCat,
} from "../services/catService";

import { CatCard } from "../components/CatCard";
import { CatModal } from "../components/CatModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

function App() {
  const [cats, setCats] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<any | null>(null);
  const [catToDelete, setCatToDelete] = useState<any | null>(null);

  // carregar gatos
  const loadCats = async () => {
    const data = await getCats();
    setCats(data);
  };

  useEffect(() => {
    loadCats();
  }, []);

  const handleCreate = async (cat: any) => {
    await createCat(cat);
    await loadCats();
  };

  const handleDelete = async () => {
    if (!catToDelete) return;

    await deleteCat(catToDelete.id);
    setCatToDelete(null);
    await loadCats();
  };

  const handleEdit = (cat: any) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const handleUpdate = async (cat: any) => {
    await updateCat(cat.id, cat);
    await loadCats();
  };
  

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <h1 className="title">Gerenciar Gatinhos</h1>

        <button
          className="add-button"
          onClick={() => {
            setSelectedCat(null); 
            setIsModalOpen(true);
          }}
        >
          + Adicionar novo Gatinho
        </button>
      </div>

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
        <CatModal
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
        <ConfirmDeleteModal
          onCancel={() => setCatToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default App;