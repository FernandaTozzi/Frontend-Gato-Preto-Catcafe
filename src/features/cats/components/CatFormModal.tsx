import { useState, type FormEvent } from "react";
import { ApiError } from "../../../services/api";
import { Modal } from "../../../components/ui/Modal/Modal";
import { Field, Options, FormActions } from "../../../components/ui/ManagementForm/FormControls";
import { PhotoPicker } from "../../../components/ui/ManagementForm/PhotoPicker";
import { usePhotos } from "../../../components/ui/ManagementForm/usePhotos";
import { photoSaveError } from "../../../components/ui/ManagementForm/photoValidation";
import { DatePicker } from "../../../components/ui/ManagementForm/DateTimePicker";
import { todayIso } from "../../../components/ui/ManagementForm/dateTime.utils";
import styles from "../../../components/ui/ManagementForm/ManagementForm.module.css";
import groupStyles from "./CatFormModal.module.css";
import type { Cat, CatForm } from "../cat.types";
import { encodeCatGroup, readCatGroup, type GroupMember } from "../catGroup";

type Props = {
  onClose: () => void | Promise<void>;
  onCreate: (cat: CatForm) => void | Promise<void>;
  onUpdate?: (cat: CatForm) => void | Promise<void>;
  catToEdit?: Cat | null;
};

const emptyMember = (): GroupMember => ({ nome: "", genero: "MACHO" });

export function CatFormModal({ onClose, onCreate, onUpdate, catToEdit }: Props) {
  const [form, setForm] = useState(() => ({
    idade: catToEdit?.idade || "",
    tipoAdocao: catToEdit?.tipoAdocao || "",
    status: catToEdit?.status || "",
    descricao: catToEdit?.descricao || "",
  }));
  const [members, setMembers] = useState<GroupMember[]>(() => {
    if (!catToEdit) return [emptyMember()];
    const parsed = readCatGroup(catToEdit);
    return parsed.length ? parsed : [emptyMember()];
  });
  const photos = usePhotos(catToEdit?.fotos?.length ? catToEdit.fotos : catToEdit?.foto);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isJoint = form.tipoAdocao === "CONJUNTA";

  function change(field: keyof typeof form, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: "" }));
    if (field === "tipoAdocao") {
      setMembers((previous) =>
        value === "CONJUNTA"
          ? previous.length >= 2 ? previous.slice(0, 3) : [...previous, emptyMember()]
          : previous.slice(0, 1)
      );
      setErrors((previous) => ({ ...previous, nome: "", genero: "" }));
    }
  }

  function updateMember(index: number, patch: Partial<GroupMember>) {
    setMembers((previous) => previous.map((member, position) =>
      position === index ? { ...member, ...patch } : member
    ));
    setErrors((previous) => ({ ...previous, nome: "", genero: "" }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (saving) return;

    const next: Record<string, string> = {};
    const selected = isJoint ? members : members.slice(0, 1);
    const encoded = encodeCatGroup(selected);

    if (!form.tipoAdocao) next.tipoAdocao = "Selecione o tipo de adoção.";
    if (isJoint && (selected.length < 2 || selected.length > 3)) {
      next.nome = "A adoção conjunta deve ter de 2 a 3 gatinhos.";
    } else if (selected.some(({ nome }) => nome.trim().length < 2 || nome.includes("/"))) {
      next.nome = "Cada nome deve ter pelo menos 2 caracteres e não pode conter '/'.";
    } else if (new Set(selected.map(({ nome }) => nome.trim().toLocaleLowerCase("pt-BR"))).size !== selected.length) {
      next.nome = "Informe nomes diferentes para cada gatinho.";
    } else if (encoded.nome.length > 100) {
      next.nome = "Os nomes juntos podem ter no máximo 100 caracteres.";
    }
    if (selected.some(({ genero }) => !["MACHO", "FEMEA"].includes(genero))) {
      next.genero = "Selecione o gênero de cada gatinho.";
    }
    if (!form.idade) next.idade = "Informe a data de nascimento estimada.";
    else if (form.idade > todayIso()) next.idade = "A data não pode ser no futuro.";
    if (!form.status) next.status = "Selecione o status.";
    if (form.descricao.trim().length < 10 || form.descricao.length > 200) {
      next.descricao = "Use de 10 a 200 caracteres.";
    }
    const photoError = photoSaveError(photos.photos);
    if (photoError) next.fotos = photoError;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    setSubmitError("");
    const payload: CatForm = {
      ...form,
      ...encoded,
      id: catToEdit?.id,
      foto: null,
      fotos: photos.photos.flatMap((photo) => photo.file ? [photo.file] : []),
      fotosMantidas: photos.photos.flatMap((photo) => photo.existing ? [photo.existing] : []),
    };

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
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      title={catToEdit ? "Editar gatinho" : "Novo gatinho"}
      subtitle="Preencha as informações e selecione as fotos dos gatinhos."
      onClose={() => { if (!saving) void onClose(); }}
      closeDisabled={saving}
    >
      <form className={styles.form} onSubmit={submit} noValidate>
        <fieldset disabled={saving} className={groupStyles.fieldset}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.sectionTitle}>Informações do gatinho</h3>
              <Options
                label="Tipo de adoção"
                value={form.tipoAdocao}
                options={[["SIMPLES", "Simples"], ["CONJUNTA", "Conjunta"]]}
                onChange={(value) => change("tipoAdocao", value)}
                error={errors.tipoAdocao}
              />

              {isJoint ? (
                <div className={styles.field}>
                  <span className={styles.label}>Gatinhos <span className={styles.required}>*</span></span>
                  <div className={groupStyles.members}>
                    {members.map((member, index) => (
                      <div className={groupStyles.memberRow} key={index}>
                        <label className={groupStyles.memberLabel} htmlFor={`cat-name-${index}`}>
                          Gatinho {index + 1}
                        </label>
                        <div className={groupStyles.memberControls}>
                          <input
                            id={`cat-name-${index}`}
                            className={styles.input}
                            placeholder="Nome"
                            maxLength={100}
                            value={member.nome}
                            aria-invalid={!!errors.nome}
                            onChange={(event) => updateMember(index, { nome: event.target.value })}
                          />
                          <button
                            type="button"
                            className={groupStyles.genderButton}
                            onClick={() => updateMember(index, {
                              genero: member.genero === "MACHO" ? "FEMEA" : "MACHO",
                            })}
                            aria-label={`Gênero de ${member.nome || `gatinho ${index + 1}`}: ${member.genero === "MACHO" ? "macho" : "fêmea"}. Clique para alternar.`}
                            title={member.genero === "MACHO" ? "Macho — clique para fêmea" : "Fêmea — clique para macho"}
                          >
                            {member.genero === "MACHO" ? "♂" : "♀"}
                          </button>
                          {members.length > 2 && (
                            <button
                              type="button"
                              className={groupStyles.removeButton}
                              onClick={() => setMembers((previous) => previous.filter((_, position) => position !== index))}
                              aria-label={`Remover gatinho ${index + 1}`}
                              title="Remover gatinho"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.nome && <p className={styles.error} role="alert">{errors.nome}</p>}
                  {errors.genero && <p className={styles.error} role="alert">{errors.genero}</p>}
                  {members.length < 3 && (
                    <button type="button" className={groupStyles.addButton} onClick={() => setMembers((previous) => [...previous, emptyMember()])}>
                      + Adicionar outro gatinho
                    </button>
                  )}
                  <p className={styles.note}>Até 3 gatinhos da mesma ninhada. Toque no símbolo para alternar o gênero.</p>
                </div>
              ) : (
                <>
                  <Field label="Nome" error={errors.nome}>
                    {(id) => (
                      <input
                        id={id}
                        className={styles.input}
                        maxLength={100}
                        value={members[0]?.nome ?? ""}
                        aria-invalid={!!errors.nome}
                        onChange={(event) => updateMember(0, { nome: event.target.value })}
                      />
                    )}
                  </Field>
                  <Options
                    label="Gênero"
                    value={form.tipoAdocao ? members[0]?.genero ?? "" : ""}
                    options={[["MACHO", "Macho"], ["FEMEA", "Fêmea"]]}
                    onChange={(value) => updateMember(0, { genero: value as GroupMember["genero"] })}
                    error={errors.genero}
                  />
                </>
              )}

              <Field label="Data de nascimento estimada" error={errors.idade}>
                {(id) => <DatePicker id={id} value={form.idade} max={todayIso()} invalid={!!errors.idade} onChange={(value) => change("idade", value)} />}
              </Field>
              <Options
                label="Status"
                value={form.status}
                options={[["DISPONIVEL", "Disponível"], ["ADOTADO", "Adotado"]]}
                onChange={(value) => change("status", value)}
                error={errors.status}
              />
            </div>
            <div className={styles.column}>
              <Field label="Descrição" error={errors.descricao}>
                {(id) => (
                  <>
                    <textarea
                      id={id}
                      className={styles.textarea}
                      maxLength={200}
                      value={form.descricao}
                      aria-invalid={!!errors.descricao}
                      onChange={(event) => change("descricao", event.target.value)}
                    />
                    <span className={styles.counter}>{form.descricao.length}/200</span>
                  </>
                )}
              </Field>
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
