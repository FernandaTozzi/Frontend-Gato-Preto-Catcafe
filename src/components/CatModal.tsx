import { useEffect, useState } from "react";
import styles from "./CatModal.module.css";

type Props = {
  onClose: () => void;
  onCreate: (cat: any) => void;
  onUpdate?: (cat: any) => void;
  catToEdit?: any | null;
};

export function CatModal({ onClose, onCreate, onUpdate, catToEdit }: Props) {
  const [form, setForm] = useState({
    nome: "",
    idade: 0,
    genero: "",
    tipoAdocao: "",
    descricao: "",
    status: "",
    foto: "",
  });

  useEffect(() => {
    if (catToEdit) {
      setForm(catToEdit);
    }
  }, [catToEdit]);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (catToEdit && onUpdate) {
      onUpdate({ ...catToEdit, ...form });
    } else {
      onCreate(form);
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {catToEdit ? "Editar Gatinho" : "Novo Gatinho"}
        </h2>

        {/* NOME */}
        <div className={styles.field}>
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
          />
        </div>

        {/* IDADE */}
        <div className={styles.field}>
          <label>Idade</label>
          <input
            type="number"
            value={form.idade}
            onChange={(e) => handleChange("idade", Number(e.target.value))}
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
          <label>Status</label>
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
          />
        </div>

        {/* FOTO */}
        <div className={styles.field}>
          <label>Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const imageUrl = URL.createObjectURL(file);

              handleChange("foto", imageUrl);
            }}
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