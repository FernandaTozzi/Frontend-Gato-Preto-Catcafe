import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getDonationAccount } from "../donation.service";
import type { DonationAccount } from "../donation.types";
import catTop from "../../../assets/hanging-cat-top.png";
import catBottom from "../../../assets/hanging-cat-bottom.png";
import styles from "./DonationSection.module.css";

// As patas são opcionais e desaparecem no celular.
const decorations = import.meta.glob("../../../assets/paws-*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const pawLeft = decorations["../../../assets/paws-left.png"];
const pawRight = decorations["../../../assets/paws-right.png"];

function DonationModal({ onClose }: { onClose: () => void }) {
  const [account, setAccount] = useState<DonationAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    getDonationAccount()
      .then((result) => {
        if (active) setAccount(result);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os dados bancários.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function copyPixKey() {
    if (!account?.chavePix) return;

    try {
      await navigator.clipboard.writeText(account.chavePix);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>

        <h2 id="donation-modal-title">Faça sua doação</h2>
        <p>Seu carinho ajuda a cuidar dos nossos gatinhos!</p>

        {loading && <p className={styles.message}>Carregando informações...</p>}
        {error && <p className={styles.message} role="alert">{error}</p>}

        {account && !loading && (
          <div className={styles.bankDetails}>
            <h3>Dados bancários</h3>
            <dl>
              <dt>Titular</dt>
              <dd>{account.titular || "Não informado"}</dd>

              <dt>Banco</dt>
              <dd>{account.banco || "Não informado"}</dd>

              <dt>Agência</dt>
              <dd>{account.agencia || "Não informada"}</dd>

              <dt>Conta</dt>
              <dd>{account.conta || "Não informada"}</dd>

              <dt>Chave Pix</dt>
              <dd className={styles.key}>{account.chavePix || "Não informada"}</dd>
            </dl>

            {account.chavePix?.trim() && (
              <button
                type="button"
                className={styles.copyButton}
                onClick={copyPixKey}
              >
                {copied ? "Chave copiada!" : "Copiar chave Pix"}
              </button>
            )}
          </div>
        )}

        <p className={styles.warning}>
          Antes de confirmar a doação, confira o nome do recebedor no aplicativo do seu banco.
        </p>
      </section>
    </div>,
    document.body
  );
}

export function DonationSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="doacao" className={styles.section} aria-labelledby="donation-title">
      <img src={catTop} className={styles.catTop} alt="" aria-hidden="true" />
      {pawLeft && (
        <img src={pawLeft} className={`${styles.paws} ${styles.pawsLeft}`} alt="" aria-hidden="true" />
      )}
      {pawRight && (
        <img src={pawRight} className={`${styles.paws} ${styles.pawsRight}`} alt="" aria-hidden="true" />
      )}

      <div className={styles.content}>
        <h2 id="donation-title">Compartilhe Amor!</h2>
        <p>
          Todo gesto de carinho faz a diferença para os nossos gatinhos.
          Sua ajuda contribui para alimentação, cuidados veterinários e muito amor!
        </p>
        <p>Você pode colaborar com qualquer valor, de forma simples e segura.</p>
        <h3>Aceitamos Doações!</h3>
        <button
          type="button"
          className={styles.donateButton}
          onClick={() => setOpen(true)}
        >
          FAZER DOAÇÃO
        </button>
      </div>

      <img src={catBottom} className={styles.catBottom} alt="" aria-hidden="true" />
      {open && <DonationModal onClose={() => setOpen(false)} />}
    </section>
  );
}
