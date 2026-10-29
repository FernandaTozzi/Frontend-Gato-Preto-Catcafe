import { useState } from "react";
import { ApiError } from "../../../services/api";
import type { FormEvent } from "react";
import { Modal } from "../../../components/ui/Modal/Modal";
import { Field, Options, FormActions } from "../../../components/ui/ManagementForm/FormControls";
import { PhotoPicker } from "../../../components/ui/ManagementForm/PhotoPicker";
import { usePhotos } from "../../../components/ui/ManagementForm/usePhotos";
import { photoSaveError } from "../../../components/ui/ManagementForm/photoValidation";
import styles from "../../../components/ui/ManagementForm/ManagementForm.module.css";
import type { Cat, CatForm } from "../cat.types";
import { DatePicker } from "../../../components/ui/ManagementForm/DateTimePicker";
import { todayIso } from "../../../components/ui/ManagementForm/dateTime.utils";

type Props = {
  onClose: () => void | Promise<void>;
  onCreate: (cat: CatForm) => void | Promise<void>;
  onUpdate?: (cat: CatForm) => void | Promise<void>;
  catToEdit?: Cat | null;
};

export function CatFormModal({ onClose, onCreate, onUpdate, catToEdit }: Props) {
  const [form, setForm] = useState(() => ({
    nome: catToEdit?.nome || "",
    idade: catToEdit?.idade || "",
    genero: catToEdit?.genero || "",
    tipoAdocao: catToEdit?.tipoAdocao || "",
    status: catToEdit?.status || "",
    descricao: catToEdit?.descricao || "",
  }));
  const photos = usePhotos(catToEdit?.fotos?.length ? catToEdit.fotos : catToEdit?.foto);
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
    if (form.nome.trim().length < 2) next.nome = "O nome deve ter pelo menos 2 caracteres.";
    if (!form.idade) next.idade = "Informe a data de nascimento estimada.";
    else if (form.idade > todayIso()) next.idade = "A data não pode ser no futuro.";
    if (!form.genero) next.genero = "Selecione o gênero.";
    if (!form.tipoAdocao) next.tipoAdocao = "Selecione o tipo de adoção.";
    if (!form.status) next.status = "Selecione o status.";
    if (form.descricao.trim().length < 10 || form.descricao.length > 200) next.descricao = "Use de 10 a 200 caracteres.";
    const photoError = photoSaveError(photos.photos);
    if (photoError) next.fotos = photoError;
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    setSubmitError("");
    const payload: CatForm = { ...form, id: catToEdit?.id, foto: null, fotos: photos.photos.flatMap(photo => photo.file ? [photo.file] : []), fotosMantidas: photos.photos.flatMap(photo => photo.existing ? [photo.existing] : []) };
    try {
      if (catToEdit && onUpdate) await onUpdate(payload);
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
    <Modal title={catToEdit ? "Editar gatinho" : "Novo gatinho"} subtitle="Preencha as informações e selecione as fotos do gatinho." onClose={() => { if (!saving) void onClose(); }} closeDisabled={saving}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <fieldset disabled={saving} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Informações do gatinho</h3>
              <Field label="Nome" error={errors.nome}>{id => <input id={id} className={styles.input} maxLength={100} value={form.nome} aria-invalid={!!errors.nome} onChange={event => change("nome", event.target.value)} />}</Field>
              <Field label="Data de nascimento estimada" error={errors.idade}>{id => <DatePicker id={id} value={form.idade} max={todayIso()} invalid={!!errors.idade} onChange={value => change("idade", value)} />}</Field>
              <Options label="Gênero" value={form.genero} options={[["MACHO", "Macho"], ["FEMEA", "Fêmea"]]} onChange={value => change("genero", value)} error={errors.genero} />
              <Options label="Tipo de adoção" value={form.tipoAdocao} options={[["SIMPLES", "Simples"], ["CONJUNTA", "Conjunta"]]} onChange={value => change("tipoAdocao", value)} error={errors.tipoAdocao} />
              <Options label="Status" value={form.status} options={[["DISPONIVEL", "Disponível"], ["ADOTADO", "Adotado"]]} onChange={value => change("status", value)} error={errors.status} />
            </div>
            <div className={styles.column}>
              <Field label="Descrição" error={errors.descricao}>{id => <><textarea id={id} className={styles.textarea} maxLength={200} value={form.descricao} aria-invalid={!!errors.descricao} onChange={event => change("descricao", event.target.value)} /><span className={styles.counter}>{form.descricao.length}/200</span></>}</Field>
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
