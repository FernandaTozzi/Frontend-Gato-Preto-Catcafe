import { useState } from "react";

type Props = {
  onClose: () => void;
  onCreate: (cat: any) => void;
};

export function CatModal({ onClose, onCreate }: Props) {
  const [form, setForm] = useState({
    nome: "",
    idade: 0,
    genero: "MACHO",
    tipoAdocao: "SIMPLES",
    descricao: "",
    status: "DISPONIVEL",
    foto: "",
  });

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    onCreate(form);
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Novo Gatinho 🐱</h2>

        <input
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            placeholder="Nome"
        />

       <input
            type="number"
            value={form.idade}
            onChange={(e) => handleChange("idade", Number(e.target.value))}
            placeholder="Idade"
        />

        {/* GENERO */}
        <label>
        <input
            type="radio"
            name="genero"
            checked={form.genero === "MACHO"}
            onChange={() => handleChange("genero", "MACHO")}
        />
        MACHO
        </label>

        <label>
        <input
            type="radio"
            name="genero"
            checked={form.genero === "FEMEA"}
            onChange={() => handleChange("genero", "FEMEA")}
        />
        FEMEA
        </label>

        {/* TIPO ADOÇÃO*/}

        <label>
        <input
            type="radio"
            name="tipo"
            checked={form.tipoAdocao === "SIMPLES"}
            onChange={() => handleChange("tipoAdocao", "SIMPLES")}
        />
        SIMPLES
        </label>

        <label>
        <input
            type="radio"
            name="tipo"
            checked={form.tipoAdocao === "CONJUNTA"}
            onChange={() => handleChange("tipoAdocao", "CONJUNTA")}
        />
        CONJUNTA
        </label>        

        {/* STATUS */}
        <label>
        <input
            type="radio"
            name="status"
            checked={form.status === "DISPONIVEL"}
            onChange={() => handleChange("status", "DISPONIVEL")}
        />
        DISPONIVEL
        </label>

        <label>
        <input
            type="radio"
            name="status"
            checked={form.status === "ADOTADO"}
            onChange={() => handleChange("status", "ADOTADO")}
        />
        ADOTADO
        </label>

        <textarea
        value={form.descricao}
        onChange={(e) => handleChange("descricao", e.target.value)}
        />

        <input type="file"
          onChange={(e: any) =>
            handleChange("foto", e.target.files[0]?.name)
          }
        />

        <button onClick={handleSubmit}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};