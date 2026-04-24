import { useState } from "react";
import styles from "./CatModal.module.css";

type Props = {
  onClose: () => void;
  onCreate: (cat: any) => void;
  onUpdate?: (cat: any) => void;
  catToEdit?: any;
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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Novo Gatinho</h2>

        {/* NOME */}
        <div className={styles.field}>
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            placeholder="Digite o nome"
          />
        </div>

        {/* IDADE */}
        <div className={styles.field}>
          <label>Idade</label>
          <input
            type="number"
            value={form.idade}
            onChange={(e) => handleChange("idade", Number(e.target.value))}
            placeholder="Digite a idade"
          />
        </div>

        {/* GENERO */}
        <div className={styles.field}>
          <label>Gênero</label>
          <div className={styles.optionsRow}>
            <button
              className={`${styles.optionBtn} ${
                form.genero === "MACHO" ? styles.active : ""
              }`}
              onClick={() => handleChange("genero", "MACHO")}
            >
              Macho
            </button>

            <button
              className={`${styles.optionBtn} ${
                form.genero === "FEMEA" ? styles.active : ""
              }`}
              onClick={() => handleChange("genero", "FEMEA")}
            >
              Fêmea
            </button>
          </div>
        </div>

        {/* TIPO ADOÇÃO */}
        <div className={styles.field}>
          <label>Tipo de Adoção</label>
          <div className={styles.optionsRow}>
            <button
              className={`${styles.optionBtn} ${
                form.tipoAdocao === "SIMPLES" ? styles.active : ""
              }`}
              onClick={() => handleChange("tipoAdocao", "SIMPLES")}
            >
              Simples
            </button>

            <button
              className={`${styles.optionBtn} ${
                form.tipoAdocao === "CONJUNTA" ? styles.active : ""
              }`}
              onClick={() => handleChange("tipoAdocao", "CONJUNTA")}
            >
              Conjunta
            </button>
          </div>
        </div>

        {/* STATUS */}
        <div className={styles.field}>
          <label>Status do Gatinho</label>
          <div className={styles.optionsRow}>
            <button
              className={`${styles.optionBtn} ${
                form.status === "DISPONIVEL" ? styles.active : ""
              }`}
              onClick={() => handleChange("status", "DISPONIVEL")}
            >
              Disponível
            </button>

            <button
              className={`${styles.optionBtn} ${
                form.status === "ADOTADO" ? styles.active : ""
              }`}
              onClick={() => handleChange("status", "ADOTADO")}
            >
              Adotado
            </button>
          </div>
        </div>

        {/* DESCRIÇÃO */}
        <div className={styles.field}>
          <label>Descrição</label>
          <textarea
            value={form.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            placeholder="Descreva o gatinho..."
          />
        </div>

        {/* FOTO */}
        <div className={styles.field}>
          <label>Foto</label>
          <input
            type="file"
            onChange={(e: any) =>
              handleChange("foto", e.target.files[0]?.name)
            }
          />
        </div>

        {/* BOTÕES */}
        <div className={styles.actions}>
          <button className={styles.saveBtn} onClick={handleSubmit}>
            Salvar
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}