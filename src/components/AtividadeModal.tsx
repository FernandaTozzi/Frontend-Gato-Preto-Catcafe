import { useEffect, useState } from "react";
import styles from "./CatModal.module.css";

type Props = {
  onClose: () => void;
  onCreate: (atividade: FormData) => void;
  onUpdate?: (atividade: any) => void;
  atividadeToEdit?: any | null;
};

export function AtividadeModal({
  onClose,
  onCreate,
  onUpdate,
  atividadeToEdit,
}: Props) {
  const [form, setForm] = useState<any>({
  titulo: "",
  descricao: "",
  data: "",
  horarioInicio: "",
  horarioFim: "",
  imagem: null,
});

const [preview, setPreview] = useState<string | null>(null);

useEffect(() => {
  if (atividadeToEdit) {
    setForm({
      titulo: atividadeToEdit.titulo || "",
      descricao: atividadeToEdit.descricao || "",
      data: atividadeToEdit.data || "",
      horarioInicio: atividadeToEdit.horarioInicio?.slice(0, 5) || "",
      horarioFim: atividadeToEdit.horarioFim?.slice(0, 5) || "",
      imagem: null,
    });

    setPreview(
      atividadeToEdit.imagem
        ? `http://localhost:8080/uploads/${atividadeToEdit.imagem}`
        : null
    );
  } else {
    setPreview(null);
  }
}, [atividadeToEdit]);


  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (atividadeToEdit && onUpdate) {
        onUpdate({ ...atividadeToEdit, ...form });
    } else {
        onCreate(form);
    }

    onClose();
    };
    
  return (
    <div className={styles.overlay}>
      <div
  className={styles.modal}
  style={{
    width: "720px",
  }}
>
        <h2 className={styles.title}>
          {atividadeToEdit ? "Editar Atividade" : "Nova Atividade"}
        </h2>
       <div style={modalColumns}>
        <div style={leftColumn}>
          <div className={styles.field}>
            <label>Título</label>

            <input
              value={form.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Descrição</label>

            <textarea
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Data</label>

            <input
              type="date"
              value={form.data}
              onChange={(e) => handleChange("data", e.target.value)}
            />
          </div>
        </div>
        <div style={rightColumn}>
          <div className={styles.field}>
  <label>Horário de início</label>

  <input
    type="time"
    value={form.horarioInicio}
    onChange={(e) => handleChange("horarioInicio", e.target.value)}
  />
</div>

<div className={styles.field}>
  <label>Horário de término</label>

  <input
    type="time"
    value={form.horarioFim}
    onChange={(e) => handleChange("horarioFim", e.target.value)}
  />
</div>

<div className={styles.field}>
  <label>Imagem</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      handleChange("imagem", file);

      setPreview(URL.createObjectURL(file));
    }}
  />

  {preview && (
    <div style={previewContainer}>
      <img
        src={preview}
        alt="Prévia"
        style={previewImage}
      />
    </div>
  )}
</div>
        </div>
      </div>
       

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

const modalColumns = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",  
};

const leftColumn = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  minWidth: 0,
};

const rightColumn = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  minWidth: 0,
};

const previewContainer = {
  marginTop: "15px",
  display: "flex",
  justifyContent: "center",
};

const previewImage = {
  width: "100px",
  height: "100px",
  objectFit: "cover" as const,
  borderRadius: "12px",
  border: "2px solid #ddd",
};