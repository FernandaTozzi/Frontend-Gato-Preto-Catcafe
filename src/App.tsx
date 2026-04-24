import { useEffect, useState } from "react";
import { getCats, createCat, deleteCat, updateCat } from "./services/catService";
import { CatCard } from "./components/CatCard";
import { CatModal } from "./components/CatModal";

function App() {
  const [cats, setCats] = useState<any[]>([]);
  const [editingCat, setEditingCat] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCats = () => {
    getCats().then(setCats);
  };

  useEffect(() => {
    loadCats();
  }, []);

  const handleCreate = async (cat: any) => {
    await createCat(cat);
    loadCats();
  };

  const handleDelete = async (id: number) => {
    await deleteCat(id);
    loadCats();
  };

  const handleUpdate = async () => {
    if (!editingCat) return;

    await updateCat(editingCat.id, editingCat);
    setEditingCat(null);
    loadCats();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Gerenciar Gatinhos</h1>

        <button
          className="add-button"
          onClick={() => setIsModalOpen(true)}
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
            onDelete={handleDelete}
            onEdit={setEditingCat}
          />
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <CatModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
        />
      )}

      {editingCat && (
        <div style={{ marginTop: "20px" }}>
          <h3>Editando: {editingCat.nome}</h3>

          <input
            value={editingCat.nome}
            onChange={(e) =>
              setEditingCat({ ...editingCat, nome: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Salvar</button>
        </div>
      )}
    </div>
  );
}

export default App;