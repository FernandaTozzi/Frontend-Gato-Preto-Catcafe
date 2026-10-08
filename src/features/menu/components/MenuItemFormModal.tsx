import { Modal } from "../../../components/ui/Modal/Modal";
import type { MenuItem, MenuItemForm } from "../menu.types";
import { useState } from "react";

export function MenuItemFormModal({
  itemToEdit,
  onClose,
  onCreate,
  onUpdate,
}: { itemToEdit?: MenuItem | null; onClose: () => void; onCreate: (item: MenuItemForm) => void | Promise<void>; onUpdate: (item: MenuItemForm) => void | Promise<void> }) {
  const [nome, setNome] = useState(itemToEdit?.nome || "");
  const [descricao, setDescricao] = useState(itemToEdit?.descricao || "");
  const [preco, setPreco] = useState(itemToEdit?.preco?.toString() || "");
  const [categoria, setCategoria] = useState(itemToEdit?.categoria || "");
  const [imagem, setImagem] = useState<File | null>(null);


  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    const item = {
      id: itemToEdit?.id,
      nome,
      descricao,
      preco,
      categoria,
      imagem,
    };

    setSaving(true);
    setSubmitError("");
    try {
      if (itemToEdit) await onUpdate(item);
      else await onCreate(item);
      onClose();
    } catch { setSubmitError("Não foi possível salvar. Tente novamente."); }
    finally { setSaving(false); }
  };

  return (
    <Modal title={itemToEdit ? "Editar Item do Cardápio" : "Adicionar Item ao Cardápio"} onClose={() => { if (!saving) onClose(); }} style={modal} titleStyle={title}>


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

          {submitError && <p role="alert">{submitError}</p>}
          <div style={buttons}>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              style={cancelButton}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              style={saveButton}
            >
              {itemToEdit ? "Salvar" : "Adicionar"}
            </button>
          </div>
        </form>
    </Modal>
  );
}


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