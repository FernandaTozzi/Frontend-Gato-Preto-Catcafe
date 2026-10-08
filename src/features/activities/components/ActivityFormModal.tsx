import type { Activity, ActivityForm } from "../activity.types";
import { API_BASE_URL } from "../../../services/api";
import { useEffect, useState } from "react";
import styles from "../../../components/ui/FormField/FormField.module.css";
import { Modal } from "../../../components/ui/Modal/Modal";
import { ValidationLabel } from "../../../components/ui/FormField/ValidationLabel";

type Props = {
  onClose: () => void | Promise<void>;
  onCreate: (atividade: ActivityForm) => void | Promise<void>;
  onUpdate?: (atividade: ActivityForm) => void | Promise<void>;
  atividadeToEdit?: Activity | null;
};

export function ActivityFormModal({
  onClose,
  onCreate,
  onUpdate,
  atividadeToEdit,
}: Props) {
  const [form, setForm] = useState<ActivityForm>(() => ({
    titulo: atividadeToEdit?.titulo || "",
    descricao: atividadeToEdit?.descricao || "",
    data: atividadeToEdit?.data || "",
    horarioInicio: atividadeToEdit?.horarioInicio?.slice(0, 5) || "",
    horarioFim: atividadeToEdit?.horarioFim?.slice(0, 5) || "",
    imagem: null,
  }));
  const [preview, setPreview] = useState<string | null>(() =>
    atividadeToEdit?.imagem ? `${API_BASE_URL}/uploads/${atividadeToEdit.imagem}` : null
  );
  useEffect(() => {
    if (!preview?.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);
  const [errors, setErrors] = useState<Partial<Record<keyof ActivityForm, string>>>({});

 const handleChange = <K extends keyof ActivityForm>(field: K, value: ActivityForm[K]) => {
  setForm((prev) => ({
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
  const newErrors: Partial<Record<keyof ActivityForm, string>> = {};

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

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    if (saving) return;
    if (!validateForm()) return;

    setSaving(true);
    setSubmitError("");
    try {
      if (atividadeToEdit && onUpdate) await onUpdate({ ...atividadeToEdit, ...form });
      else await onCreate(form);
      onClose();
    } catch {
      setSubmitError("Não foi possível salvar. Tente novamente.");
    } finally { setSaving(false); }
  };
      
  return (
    <Modal title={atividadeToEdit ? "Editar Atividade" : "Nova Atividade"} onClose={() => { if (!saving) onClose(); }} style={{ width: "720px" }}>

       <div className={styles.columns}>
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
       

        {submitError && <p role="alert">{submitError}</p>}
        <div className={styles.actions}>
          <button className={styles.saveBtn} onClick={handleSubmit} disabled={saving}>
            Salvar
          </button>

          <button className={styles.cancelBtn} onClick={onClose} disabled={saving}>
            Cancelar
          </button>
        </div>
    </Modal>
  );
}


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






