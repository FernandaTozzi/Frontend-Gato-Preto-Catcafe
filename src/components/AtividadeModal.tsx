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
    inicioEvento: "",
    fimEvento: "",
    imagem: null,
  });

  useEffect(() => {
    if (atividadeToEdit) {
      setForm({
        titulo: atividadeToEdit.titulo || "",
        descricao: atividadeToEdit.descricao || "",
        inicioEvento: atividadeToEdit.inicioEvento?.slice(0, 16) || "",
        fimEvento: atividadeToEdit.fimEvento?.slice(0, 16) || "",
        imagem: null,
      });
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
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {atividadeToEdit ? "Editar Atividade" : "Nova Atividade"}
        </h2>

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
          <label>Início do Evento</label>
          <input
            type="datetime-local"
            value={form.inicioEvento}
            onChange={(e) => handleChange("inicioEvento", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Fim do Evento</label>
          <input
            type="datetime-local"
            value={form.fimEvento}
            onChange={(e) => handleChange("fimEvento", e.target.value)}
          />
        </div>

        {!atividadeToEdit && (
          <div className={styles.field}>
            <label>Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                handleChange("imagem", file);
              }}
            />
          </div>
        )}

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