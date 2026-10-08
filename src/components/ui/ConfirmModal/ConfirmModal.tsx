import { useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "../FormField/FormField.module.css";
import confirmDeleteIcon from "../../../assets/confirm-delete.png";
import { HangingCat } from "../../layout/HangingCat/HangingCat";

type Props = {
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
};

export function ConfirmModal({ onCancel, onConfirm, title = "Confirmar exclusão", message = "Tem certeza que deseja excluir este registro?" }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const confirm = async () => {
    if (pending) return;
    setPending(true); setError("");
    try { await onConfirm(); }
    catch { setError("Não foi possível excluir. Tente novamente."); }
    finally { setPending(false); }
  };
  return (
    <Modal title={title} onClose={() => { if (!pending) onCancel(); }} style={modalWithCat}>
        <HangingCat position="top" width={190} offset={105} />
        <HangingCat position="bottom" width={130} offset={85} />
        <img
          src={confirmDeleteIcon}
          alt="Confirmar exclusão"
          style={iconStyle}
        />

        

        <p style={messageText}>
          {message}
        </p>

        {error && <p role="alert">{error}</p>}
        <div style={actions}>
          <button className={styles.cancelBtn }  onClick={onCancel} disabled={pending}>
            CANCELAR
          </button>

          <button className={styles.saveBtn} onClick={confirm} disabled={pending}>
            EXCLUIR
          </button>
        </div>
    </Modal>
  );
}

const modalWithCat = {
  position: "relative" as const,
  overflow: "visible",
  maxHeight: "none",
  background: "#f5f5f5",
  borderRadius: "25px",
  padding: "60px 40px 60px",
  width: "500px",
  maxWidth: "90%",
  textAlign: "center" as const,
};

const iconStyle = {
  width: "80px",
  height: "80px",
  objectFit: "contain" as const,
  display: "block",
  margin: "0 auto 20px",
};

const messageText = {
  color: "#aeaeae",
  textAlign: "center" as const,
  marginBottom: "35px",
};

const actions = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
};