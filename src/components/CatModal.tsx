import { useEffect, useState } from "react";
import styles from "./CatModal.module.css";

type Props = {
  onClose: () => void;
  onCreate: (cat: any) => void;
  onUpdate?: (cat: any) => void;
  catToEdit?: any | null;
};

export function CatModal({ onClose, onCreate, onUpdate, catToEdit }: Props) {
  const [form, setForm] = useState<any>({
    nome: "",
    idade: "",    
    genero: "",
    tipoAdocao: "",
    descricao: "",
    status: "",
    foto: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
  if (catToEdit) {
    setForm({
      nome: catToEdit.nome || "",
      idade: catToEdit.idade || "",
      genero: catToEdit.genero || "",
      tipoAdocao: catToEdit.tipoAdocao || "",
      descricao: catToEdit.descricao || "",
      status: catToEdit.status || "",
      foto: null,
    });

    setPreview(
      catToEdit.foto
        ? `http://localhost:8080/uploads/${catToEdit.foto}`
        : null
    );
  } else {
    setPreview(null);
  }
}, [catToEdit]);

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });

    if (errors[field]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      setErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

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

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (catToEdit && onUpdate) {
      onUpdate({ ...catToEdit, ...form });
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
    <div   className={styles.overlay}>
      <div className={styles.modal}
      style={{
        width: "600px",
      }}>
        <h2 className={styles.title}>
          {catToEdit ? "Editar Gatinho" : "Novo Gatinho"}
        </h2>

        <div style={modalColumns}>
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
  gap: "12px",
  display: "flex",
  flexDirection: "column" as const,
};

const rightColumn = {
  gap: "12px",
  display: "flex",
  flexDirection: "column" as const,
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