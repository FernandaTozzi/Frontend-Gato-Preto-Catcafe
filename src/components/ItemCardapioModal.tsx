import { useEffect, useState } from "react";

export function ItemCardapioModal({
  itemToEdit,
  onClose,
  onCreate,
  onUpdate,
}: any) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    if (itemToEdit) {
      setNome(itemToEdit.nome || "");
      setDescricao(itemToEdit.descricao || "");
      setPreco(itemToEdit.preco?.toString() || "");
      setCategoria(itemToEdit.categoria || "");
    }
  }, [itemToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const item = {
      id: itemToEdit?.id,
      nome,
      descricao,
      preco,
      categoria,
      imagem,
    };

    if (itemToEdit) {
      await onUpdate(item);
    } else {
      await onCreate(item);
    }

    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={title}>
          {itemToEdit
            ? "Editar Item do Cardápio"
            : "Adicionar Item ao Cardápio"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label style={label}>Nome</label>

          <input
            style={input}
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <label style={label}>Descrição</label>

          <textarea
            style={textarea}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />

          <label style={label}>Preço</label>

          <input
            style={input}
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />

          <label style={label}>Categoria</label>

          <div style={categoryContainer}>
        {[
            "Bebidas Geladas",
            "Bebidas Quentes",
            "Salgados",
            "Doces",
            "Prato Feito",
        ].map((opcao) => (
            <button
            key={opcao}
            type="button"
            onClick={() => setCategoria(opcao)}
            style={{
                ...categoryButton,
                ...(categoria === opcao ? categoryButtonSelected : {}),
            }}
            >
            {opcao}
            </button>
        ))}
          </div>
          
          <label style={label}>Imagem</label>

          <input
            style={input}
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImagem(e.target.files?.[0] || null)
            }
          />

          <div style={buttons}>
            <button
              type="button"
              onClick={onClose}
              style={cancelButton}
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={saveButton}
            >
              {itemToEdit ? "Salvar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "white",
  width: "450px",
  maxWidth: "90%",
  borderRadius: "20px",
  padding: "30px",
};

const title = {
  color: "#7c75a3",
  marginTop: 0,
};

const label = {
  display: "block",
  marginTop: "12px",
  marginBottom: "5px",
  color: "#666",
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  boxSizing: "border-box" as const,
};

const textarea = {
  ...input,
  minHeight: "80px",
  resize: "vertical" as const,
};

const buttons = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "25px",
};

const cancelButton = {
  border: "none",
  borderRadius: "20px",
  padding: "10px 20px",
  cursor: "pointer",
};

const saveButton = {
  background: "#7c75a3",
  color: "white",
  border: "none",
  borderRadius: "20px",
  padding: "10px 20px",
  cursor: "pointer",
};

const categoryContainer = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "8px",
};

const categoryButton = {
  background: "#fff",
  color: "#7c75a3",
  border: "1px solid #7c75a3",
  borderRadius: "20px",
  padding: "8px 14px",
  cursor: "pointer",
  transition: "0.2s",
};

const categoryButtonSelected = {
  background: "#7c75a3",
  color: "#fff",
};