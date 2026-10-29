import { useState } from "react";
import { ApiError } from "../../../services/api";
import type { FormEvent } from "react";
import { Modal } from "../../../components/ui/Modal/Modal";
import { Field, FormActions } from "../../../components/ui/ManagementForm/FormControls";
import { PhotoPicker } from "../../../components/ui/ManagementForm/PhotoPicker";
import { usePhotos } from "../../../components/ui/ManagementForm/usePhotos";
import { photoSaveError } from "../../../components/ui/ManagementForm/photoValidation";
import styles from "../../../components/ui/ManagementForm/ManagementForm.module.css";
import type { Activity, ActivityForm } from "../activity.types";
import { DatePicker, TimePicker } from "../../../components/ui/ManagementForm/DateTimePicker";
import { timeMinutes } from "../../../components/ui/ManagementForm/dateTime.utils";

type Props = {
  onClose: () => void | Promise<void>;
  onCreate: (activity: ActivityForm) => void | Promise<void>;
  onUpdate?: (activity: ActivityForm) => void | Promise<void>;
  atividadeToEdit?: Activity | null;
};

export function ActivityFormModal({ onClose, onCreate, onUpdate, atividadeToEdit }: Props) {
  const [form, setForm] = useState(() => ({
    titulo: atividadeToEdit?.titulo || "",
    descricao: atividadeToEdit?.descricao || "",
    data: atividadeToEdit?.data || "",
    horarioInicio: atividadeToEdit?.horarioInicio?.slice(0, 5) || "10:00",
    horarioFim: atividadeToEdit?.horarioFim?.slice(0, 5) || "19:00",
  }));
  const photos = usePhotos(atividadeToEdit?.imagens?.length ? atividadeToEdit.imagens : atividadeToEdit?.imagem);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function change(field: keyof typeof form, value: string) {
    setForm(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: "" }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (saving) return;
    const next: Record<string, string> = {};
    if (form.titulo.trim().length < 3) next.titulo = "O título deve ter pelo menos 3 caracteres.";
    if (form.descricao.trim().length < 10 || form.descricao.length > 500) next.descricao = "Use de 10 a 500 caracteres.";
    if (!form.data) next.data = "Informe a data.";
    if (!form.horarioInicio) next.horarioInicio = "Informe o horário de início.";
    if (!form.horarioFim) next.horarioFim = "Informe o horário de término.";
    if (timeMinutes(form.horarioFim) <= timeMinutes(form.horarioInicio)) next.horarioFim = "O término deve ser após o início. 00:00 representa o encerramento do dia.";
    const photoError = photoSaveError(photos.photos);
    if (photoError) next.fotos = photoError;
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    setSubmitError("");
    const payload: ActivityForm = { ...form, id: atividadeToEdit?.id, imagem: null, imagens: photos.photos.flatMap(photo => photo.file ? [photo.file] : []), imagensMantidas: photos.photos.flatMap(photo => photo.existing ? [photo.existing] : []) };
    try {
      if (atividadeToEdit && onUpdate) await onUpdate(payload);
      else await onCreate(payload);
      await onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.fields);
        setSubmitError(error.message);
      } else {
        setSubmitError("Não foi possível salvar. Tente novamente.");
      }
    }
    finally { setSaving(false); }
  }

  return (
    <Modal title={atividadeToEdit ? "Editar atividade especial" : "Nova atividade especial"} subtitle="Organize os detalhes, os horários e as fotos da atividade." onClose={() => { if (!saving) void onClose(); }} closeDisabled={saving}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <fieldset disabled={saving} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Informações da atividade</h3>
              <Field label="Título" error={errors.titulo}>{id => <input id={id} className={styles.input} maxLength={100} value={form.titulo} aria-invalid={!!errors.titulo} onChange={event => change("titulo", event.target.value)} />}</Field>
              <Field label="Data" error={errors.data}>{id => <DatePicker id={id} value={form.data} invalid={!!errors.data} onChange={value => change("data", value)} />}</Field>
              <Field label="Horário de início" error={errors.horarioInicio}>{id => <TimePicker id={id} value={form.horarioInicio} invalid={!!errors.horarioInicio} onChange={value => change("horarioInicio", value)} />}</Field>
              <Field label="Horário de término" error={errors.horarioFim}>{id => <TimePicker id={id} value={form.horarioFim} invalid={!!errors.horarioFim} onChange={value => change("horarioFim", value)} />}</Field>
              <p className={styles.note}>Horários de meia em meia hora. 00:00 corresponde ao fim do dia selecionado.</p>
            </div>
            <div className={styles.column}>
              <Field label="Descrição" error={errors.descricao}>{id => <><textarea id={id} className={styles.textarea} maxLength={500} value={form.descricao} aria-invalid={!!errors.descricao} onChange={event => change("descricao", event.target.value)} /><span className={styles.counter}>{form.descricao.length}/500</span></>}</Field>
              <PhotoPicker value={photos} max={4} disabled={saving} error={errors.fotos} />
            </div>
          </div>
        </fieldset>
        {submitError && <p className={styles.error} role="alert">{submitError}</p>}
        <FormActions saving={saving} onClose={() => { void onClose(); }} />
      </form>
    </Modal>
  );
}
