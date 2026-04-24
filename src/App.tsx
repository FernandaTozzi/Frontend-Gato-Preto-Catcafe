import { useEffect, useState } from "react";
import { getCats, createCat, deleteCat, updateCat  } from "./services/catService";

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
// Delete
  const handleDelete = async (id: number) => {
    await deleteCat(id);
    loadCats();
  };

  //Salva 
  const handleUpdate = async () => {
    if (!editingCat) return;

    await updateCat(editingCat.id, editingCat);
    setEditingCat(null);
    loadCats();
  };

  
  return (
    <div>
      <h1>Cat Café 🐱</h1>

      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do gato"
      />

      <button onClick={handleCreate}>
        Adicionar gato
      </button>

      {editingCat && (
        <div>
          <h2>Editando: {editingCat.nome}</h2>

          <input
            value={editingCat.nome}
            onChange={(e) =>
              setEditingCat({ ...editingCat, nome: e.target.value })
            }
          />

          <button onClick={handleUpdate}>
            Salvar
          </button>
        </div>
      )}

      {cats.map((cat) => (
        <div key={cat.id}>
          <h2>{cat.nome}</h2>
          <p>{cat.descricao}</p>

          <button onClick={() => setEditingCat(cat)}>
            Editar
          </button>

          <button onClick={() => handleDelete(cat.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;