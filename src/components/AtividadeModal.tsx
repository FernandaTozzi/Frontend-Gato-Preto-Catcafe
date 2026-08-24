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

const [errors, setErrors] = useState<any>({});

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

  if (errors[field]) {
    const updatedErrors = { ...errors };
    delete updatedErrors[field];
    setErrors(updatedErrors);
  }
};

const validateForm = () => {
  const newErrors: any = {};

  if (!form.titulo.trim()) {
    newErrors.titulo = "Informe o título da atividade.";
  } else if (form.titulo.trim().length < 3) {
    newErrors.titulo = "O título deve ter pelo menos 3 caracteres.";
  }

  if (!form.descricao.trim()) {
    newErrors.descricao = "Informe uma descrição.";
  } else if (form.descricao.trim().length < 10) {
    newErrors.descricao = "A descrição deve ter pelo menos 10 caracteres.";
  } else if (form.descricao.trim().length > 500) {
    newErrors.descricao = "A descrição deve ter no máximo 500 caracteres.";
  }

  if (!form.data) {
    newErrors.data = "Informe a data.";
  }

  if (!form.horarioInicio) {
    newErrors.horarioInicio = "Informe o horário de início.";
  }

  if (!form.horarioFim) {
    newErrors.horarioFim = "Informe o horário de término.";
  }

  if (
    form.horarioInicio &&
    form.horarioFim &&
    form.horarioFim <= form.horarioInicio
  ) {
    newErrors.horarioFim =
      "O horário de término deve ser após o início.";
  }

  if (!atividadeToEdit && !form.imagem) {
    newErrors.imagem = "Selecione uma imagem.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (atividadeToEdit && onUpdate) {
      onUpdate({ ...atividadeToEdit, ...form });
    } else {
      onCreate(form);
    }

    onClose();
  };
      
  const ValidationLabel = ({
  text,
  error,
}: {
  text: string;
  error?: string;
}) => (
  <div style={labelRow}>
    <label style={error ? labelError : labelDefault}>
      {text}
      <span style={{ color: "#d9534f", marginLeft: "3px" }}>*</span>
    </label>

    {error && (
      <div style={tooltipWrapper}>
        <span style={warningIcon}>⚠️</span>
        <span style={tooltipText}>{error}</span>
      </div>
    )}
  </div>
);


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
            <ValidationLabel
              text="Título:"
              error={errors.titulo}
            />
            <input
              value={form.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <ValidationLabel
              text="Descrição:"
              error={errors.descricao}
            />

            <textarea
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <ValidationLabel
              text="Data:"
              error={errors.data}
            />

            <input
              type="date"
              value={form.data}
              onChange={(e) => handleChange("data", e.target.value)}
            />
          </div>
        </div>
        <div style={rightColumn}>
          <div className={styles.field}>
        <ValidationLabel
          text="Horário de início:"
          error={errors.horarioInicio}
        />

  <input
    type="time"
    value={form.horarioInicio}
    onChange={(e) => handleChange("horarioInicio", e.target.value)}
  />
</div>

<div className={styles.field}>
  <ValidationLabel
    text="Horário de término:"
    error={errors.horarioFim}
  />

  <input
    type="time"
    value={form.horarioFim}
    onChange={(e) => handleChange("horarioFim", e.target.value)}
  />
</div>

<div className={styles.field}>
 <ValidationLabel
  text="Imagem:"
  error={errors.imagem}
/>

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

const labelRow = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "6px",
};

const labelDefault = {
  color: "#555",
};

const labelError = {
  color: "#d9534f",
  fontWeight: "600",
};

const tooltipWrapper = {
  position: "relative" as const,
  display: "inline-flex",
  alignItems: "center",
};

const warningIcon = {
  cursor: "help",
  fontSize: "14px",
};

const tooltipText = {
  display: "none",
  position: "absolute" as const,
  left: "22px",
  top: "-4px",
  background: "#fff0f0",
  border: "1px solid #d9534f",
  color: "#d9534f",
  borderRadius: "6px",
  padding: "5px 8px",
  fontSize: "12px",
  whiteSpace: "nowrap" as const,
  zIndex: 9999,
};