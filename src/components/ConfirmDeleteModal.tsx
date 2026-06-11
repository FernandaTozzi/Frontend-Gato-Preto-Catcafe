import styles from "./CatModal.module.css";
import confirmDeleteIcon from "../assets/confirm-delete.png";
import { HangingCat } from "./HangingCat";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({ onCancel, onConfirm }: Props) {
  return (
    <div className={styles.overlay}>
      <div style={modalWithCat}>
        <HangingCat position="top" width={190} offset={105} />
        <HangingCat position="bottom" width={130} offset={85} />
        <img
          src={confirmDeleteIcon}
          alt="Confirmar exclusão"
          style={iconStyle}
        />

        <h2 className={styles.title}>Excluir Gatinho</h2>

        <p style={messageText}>
          Tem certeza que deseja excluir este gatinho da lista?
        </p>

        <div style={actions}>
          <button className={styles.cancelBtn }  onClick={onCancel}>
            CANCELAR
          </button>

          <button className={styles.saveBtn} onClick={onConfirm}>
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}

const modalWithCat = {
  position: "relative" as const,
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