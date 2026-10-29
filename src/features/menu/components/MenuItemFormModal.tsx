import { useState } from "react";
import { ApiError } from "../../../services/api";
import type { FormEvent } from "react";
import { Modal } from "../../../components/ui/Modal/Modal";
import { Field, Options, FormActions } from "../../../components/ui/ManagementForm/FormControls";
import { PhotoPicker } from "../../../components/ui/ManagementForm/PhotoPicker";
import { usePhotos } from "../../../components/ui/ManagementForm/usePhotos";
import styles from "../../../components/ui/ManagementForm/ManagementForm.module.css";
import type { MenuItem, MenuItemForm } from "../menu.types";

const categories = ["Bebidas Geladas", "Bebidas Quentes", "Salgados", "Doces", "Prato Feito"];

type Props = {
  itemToEdit?: MenuItem | null;
  onClose: () => void;
  onCreate: (item: MenuItemForm) => void | Promise<void>;
  onUpdate: (item: MenuItemForm) => void | Promise<void>;
};

export function MenuItemFormModal({ itemToEdit, onClose, onCreate, onUpdate }: Props) {
  const [form, setForm] = useState(() => ({ nome: itemToEdit?.nome || "", descricao: itemToEdit?.descricao || "", preco: itemToEdit?.preco?.toString() || "", categoria: itemToEdit?.categoria || "" }));
  const photos = usePhotos(itemToEdit?.imagem);
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
    if (!form.nome.trim()) next.nome = "Informe o nome do item.";
    if (!form.descricao.trim()) next.descricao = "Informe a descrição.";
    if (!form.preco || !Number.isFinite(Number(form.preco)) || Number(form.preco) < 0) next.preco = "Informe um preço válido.";
    if (!categories.includes(form.categoria)) next.categoria = "Selecione uma categoria.";
    // O cardápio mantém a foto opcional, como no formulário anterior.
    if (itemToEdit?.imagem && photos.photos.length === 0) next.imagem = "Adicione uma foto substituta para salvar a alteração.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    setSubmitError("");
    const payload: MenuItemForm = { ...form, id: itemToEdit?.id, imagem: photos.photos[0]?.file || null };
    try {
      if (itemToEdit) await onUpdate(payload);
      else await onCreate(payload);
      onClose();
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
    <Modal title={itemToEdit ? "Editar item do cardápio" : "Novo item do cardápio"} subtitle="Preencha as informações e selecione a foto do item." onClose={() => { if (!saving) onClose(); }} closeDisabled={saving}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <fieldset disabled={saving} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Informações do item</h3>
              <Field label="Nome" error={errors.nome}>{id => <input id={id} className={styles.input} maxLength={100} value={form.nome} aria-invalid={!!errors.nome} onChange={event => change("nome", event.target.value)} />}</Field>
              <Field label="Preço (R$)" error={errors.preco}>{id => <input id={id} className={styles.input} type="number" inputMode="decimal" min="0" max="999999999.99" step="0.01" value={form.preco} aria-invalid={!!errors.preco} onChange={event => { if (/^\d{0,9}(\.\d{0,2})?$/.test(event.target.value)) change("preco", event.target.value); }} />}</Field>
              <Options label="Categoria" value={form.categoria} options={categories.map(value => [value, value])} onChange={value => change("categoria", value)} error={errors.categoria} />
            </div>
            <div className={styles.column}>
              <Field label="Descrição" error={errors.descricao}>{id => <><textarea id={id} className={styles.textarea} maxLength={1000} value={form.descricao} aria-invalid={!!errors.descricao} onChange={event => change("descricao", event.target.value)} /><span className={styles.counter}>{form.descricao.length}/1000</span></>}</Field>
              <PhotoPicker value={photos} max={1} disabled={saving} error={errors.imagem} />
            </div>
          </div>
        </fieldset>
        {submitError && <p className={styles.error} role="alert">{submitError}</p>}
        <FormActions saving={saving} onClose={onClose} />
      </form>
    </Modal>
  );
}
