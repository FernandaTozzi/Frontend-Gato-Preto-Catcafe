import { useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "../ManagementForm/ManagementForm.module.css";
import confirmDeleteIcon from "../../../assets/confirm-delete.png";

type Props = {
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
};

export function ConfirmModal({ onCancel, onConfirm, title = "Confirmar exclusão", message = "Tem certeza que deseja excluir este registro?" }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function confirm() {
    if (pending) return;
    setPending(true);
    setError("");
    try { await onConfirm(); }
    catch { setError("Não foi possível excluir. Tente novamente."); }
    finally { setPending(false); }
  }

  return (
    <Modal title={title} onClose={() => { if (!pending) onCancel(); }} closeDisabled={pending} style={{ width: "500px" }}>
      <img src={confirmDeleteIcon} alt="" style={{ width: 64, height: 64, objectFit: "contain", alignSelf: "center", margin: "12px 0" }} />
      <p style={{ color: "#645b70", lineHeight: 1.5, textAlign: "center" }}>{message}</p>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.actions}>
        <button className={styles.cancel} type="button" disabled={pending} onClick={onCancel}>Cancelar</button>
        <button className={styles.save} type="button" disabled={pending} onClick={confirm}>{pending ? "Excluindo..." : "Excluir"}</button>
      </div>
    </Modal>
  );
}
