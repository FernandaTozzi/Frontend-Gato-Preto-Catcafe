import { useEffect, useState } from "react";
import { getCats, createCat, deleteCat, updateCat  } from "./services/catService";
import { CatCard } from "./components/CatCard";

function App() {
  const [cats, setCats] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [editingCat, setEditingCat] = useState<any | null>(null);

  const loadCats = () => {
    getCats().then(setCats);
  };

  useEffect(() => {
    loadCats();
  }, []);

  const handleCreate = async () => {
    await createCat({
      nome,
      idade: 1,
      genero: "MACHO",
      tipoAdocao: "SIMPLES",
      descricao: "Novo gato",
      status: "DISPONIVEL",
      foto: "foto.png",
    });

    setNome("");
    loadCats(); 
  };
// delete
  const handleDelete = async (id: number) => {
    await deleteCat(id);
    loadCats();
  };

  //Salva edição
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

        <button className="add-button">
          + Adicionar novo Gatinho
        </button>
      </div>

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
    </div>
  );
}

export default App;