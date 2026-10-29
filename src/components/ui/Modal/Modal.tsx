import { useEffect, useId, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = { children: ReactNode; title: string; onClose: () => void; style?: CSSProperties; titleStyle?: CSSProperties; subtitle?: string; closeDisabled?: boolean };

export function Modal({ children, title, onClose, style, titleStyle, subtitle, closeDisabled = false }: Props) {
  const titleId = useId();
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return createPortal(
    <div className={styles.overlay}>
      <div ref={dialog} tabIndex={-1} className={styles.modal} style={style}
        role="dialog" aria-modal="true" aria-labelledby={titleId}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
          if (event.key !== "Tab") return;
          const controls = dialog.current?.querySelectorAll<HTMLElement>(
            'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]'
          );
          if (!controls?.length) { event.preventDefault(); return; }
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
            event.preventDefault(); last.focus();
          } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) {
            event.preventDefault(); first.focus();
          }
        }}>
        <button type="button" className={styles.close} onClick={onClose} disabled={closeDisabled} aria-label="Fechar janela">×</button>
        <h2 id={titleId} className={styles.title} style={titleStyle}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </div>,
    document.body
  );
}
