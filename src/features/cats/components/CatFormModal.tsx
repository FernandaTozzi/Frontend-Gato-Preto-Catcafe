import type { Cat, CatForm } from "../cat.types";
import { API_BASE_URL } from "../../../services/api";
import { useEffect, useState } from "react";
import styles from "../../../components/ui/FormField/FormField.module.css";
import { Modal } from "../../../components/ui/Modal/Modal";
import { ValidationLabel } from "../../../components/ui/FormField/ValidationLabel";

type Props = {
  onClose: () => void | Promise<void>;
  onCreate: (cat: CatForm) => void | Promise<void>;
  onUpdate?: (cat: CatForm) => void | Promise<void>;
  catToEdit?: Cat | null;
};

export function CatFormModal({ onClose, onCreate, onUpdate, catToEdit }: Props) {
  const [form, setForm] = useState<CatForm>(() => ({
    nome: catToEdit?.nome || "",
    idade: catToEdit?.idade || "",
    genero: catToEdit?.genero || "",
    tipoAdocao: catToEdit?.tipoAdocao || "",
    descricao: catToEdit?.descricao || "",
    status: catToEdit?.status || "",
    foto: null,
  }));
  const [preview, setPreview] = useState<string | null>(() =>
    catToEdit?.foto ? `${API_BASE_URL}/uploads/${catToEdit.foto}` : null
  );
  useEffect(() => {
    if (!preview?.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);
  const [errors, setErrors] = useState<Partial<Record<keyof CatForm, string>>>({});

  const handleChange = <K extends keyof CatForm>(field: K, value: CatForm[K]) => {
    setForm({ ...form, [field]: value });

    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CatForm, string>> = {};

    if (!form.nome.trim()) {
      newErrors.nome = "Informe o nome do gatinho.";
    } else if (form.nome.trim().length < 2) {
      newErrors.nome = "O nome deve ter pelo menos 2 caracteres.";
    }

    if (!form.idade) {
      newErrors.idade = "Informe a data de nascimento estimada.";
    } else {
      const hoje = new Date();
      const data = new Date(form.idade);

  if (data > hoje) {
    newErrors.idade = "A data não pode ser no futuro.";
  }
}

    if (!form.genero) {
      newErrors.genero = "Selecione o gênero.";
    }

    if (!form.tipoAdocao) {
      newErrors.tipoAdocao = "Selecione o tipo de adoção.";
    }

    if (!form.status) {
      newErrors.status = "Selecione o status.";
    }

    if (!form.descricao.trim()) {
      newErrors.descricao = "Informe uma descrição.";
    } else if (form.descricao.trim().length < 10) {
      newErrors.descricao = "A descrição deve ter pelo menos 10 caracteres.";
    } else if (form.descricao.trim().length > 200) {
      newErrors.descricao = "A descrição deve ter no máximo 200 caracteres.";
    }

    if (!catToEdit && !form.foto) {
      newErrors.foto = "Selecione uma foto do gatinho.";
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
      if (catToEdit && onUpdate) await onUpdate({ ...catToEdit, ...form });
      else await onCreate(form);
      onClose();
    } catch {
      setSubmitError("Não foi possível salvar. Tente novamente.");
    } finally { setSaving(false); }
  };

  return (
    <Modal title={catToEdit ? "Editar Gatinho" : "Novo Gatinho"} onClose={() => { if (!saving) onClose(); }} style={{ width: "600px" }}>


        <div className={styles.columns}>
          <div style={leftColumn}>
            <div className={styles.field}>
              <ValidationLabel text="Nome:" error={errors.nome} />

              <input
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <ValidationLabel
                text="Data de nascimento estimada"
                error={errors.idade}
              />

              <input
                type="date"
                value={form.idade}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleChange("idade", e.target.value)}
              />
            </div>

            <div className={styles.field}>  
              <ValidationLabel text="Gênero:" error={errors.genero} />

              <div className={styles.optionsRow}>
                <button
                  type="button"
                  className={`${styles.optionBtn} ${
                    form.genero === "MACHO" ? styles.active : ""
                  }`}
                  onClick={() => handleChange("genero", "MACHO")}
                >
                  Macho
                </button>

                <button
                  type="button"
                  className={`${styles.optionBtn} ${
                    form.genero === "FEMEA" ? styles.active : ""
                  }`}
                  onClick={() => handleChange("genero", "FEMEA")}
                >
                  Fêmea
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <ValidationLabel
                text="Tipo de Adoção:"
                error={errors.tipoAdocao}
              />

              <div className={styles.optionsRow}>
                <button
                  type="button"
                  className={`${styles.optionBtn} ${
                    form.tipoAdocao === "SIMPLES" ? styles.active : ""
                  }`}
                  onClick={() => handleChange("tipoAdocao", "SIMPLES")}
                >
                  Simples
                </button>

                <button
                  type="button"
                  className={`${styles.optionBtn} ${
                    form.tipoAdocao === "CONJUNTA" ? styles.active : ""
                  }`}
                  onClick={() => handleChange("tipoAdocao", "CONJUNTA")}
                >
                  Conjunta
                </button>
              </div>
            </div>

            <div className={styles.field}>
              <ValidationLabel text="Status:" error={errors.status} />

              <div className={styles.optionsRow}>
                <button
                  type="button"
                  className={`${styles.optionBtn} ${
                    form.status === "DISPONIVEL" ? styles.active : ""
                  }`}
                  onClick={() => handleChange("status", "DISPONIVEL")}
                >
                  Disponível
                </button>

                <button
                  type="button"
                  className={`${styles.optionBtn} ${
                    form.status === "ADOTADO" ? styles.active : ""
                  }`}
                  onClick={() => handleChange("status", "ADOTADO")}
                >
                  Adotado
                </button>
              </div>
            </div>
          </div>

          <div style={rightColumn}>
            <div className={styles.field}>
              <ValidationLabel text="Descrição:" error={errors.descricao} />

              <textarea
                maxLength={200}
                value={form.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />

              <div style={counterText}>{form.descricao.length}/200</div>
            </div>

            <div className={styles.field}>
              <ValidationLabel text="Foto:" error={errors.foto} />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  handleChange("foto", file);

                  const imageUrl = URL.createObjectURL(file);
                  setPreview(imageUrl);
                }}
              />
              {preview && (
              <div style={previewContainer}>
                <img
                  src={preview}
                  alt="Prévia da foto"
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
  gap: "12px",
  display: "flex",
  flexDirection: "column" as const,
};

const rightColumn = {
  gap: "12px",
  display: "flex",
  flexDirection: "column" as const,
};







const counterText = {
  textAlign: "right" as const,
  fontSize: "12px",
  color: "#666",
  marginTop: "4px",
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
  borderRadius: "10px",
  border: "2px solid #ddd",
};