import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LocationPhoto } from "../locationPhotos";
import { locationImageUrl } from "../locationPhotos";
import styles from "./LocationGalleryModal.module.css";

type Props = {
  photos: LocationPhoto[];
  onClose: () => void;
};

export function LocationGalleryModal({ photos, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.scrollTop = 0;
  }, [expanded]);

  function move(direction: number) {
    setExpanded((index) => index === null ? null : (index + direction + photos.length) % photos.length);
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${expanded !== null ? styles.fullscreen : ""}`}
      aria-labelledby="location-gallery-title"
      onCancel={(event) => { event.preventDefault(); if (expanded !== null) setExpanded(null); else onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (expanded === null) return;
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}
    >
      <div className={styles.panel}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar galeria" autoFocus>×</button>
        <header className={`${styles.heading} ${expanded !== null ? styles.hiddenHeading : ""}`}>
          <img src={locationImageUrl("pink-camera.png")} alt="" className={styles.camera} />
          <h2 id="location-gallery-title">Nosso <span>cantinho</span></h2>
          <p>Conheça cada detalhe do Gato Preto Cat Café.</p>
        </header>

        {expanded === null ? (
          <div className={styles.photos}>
            {photos.map((photo, index) => (
              <button type="button" key={photo.file} className={styles.photoButton} onClick={() => setExpanded(index)} aria-label={`Ampliar: ${photo.alt}`}>
                <img src={locationImageUrl(photo.file)} alt={photo.alt} loading="lazy" />
                <span className={styles.zoom} aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.viewer}>
            <button type="button" className={styles.back} onClick={() => setExpanded(null)}>← Voltar às fotos</button>
            <div
              className={styles.viewerPhoto}
              onTouchStart={(event) => {
                touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
              }}
              onTouchEnd={(event) => {
                if (!touchStart.current) return;
                const dx = touchStart.current.x - event.changedTouches[0].clientX;
                const dy = touchStart.current.y - event.changedTouches[0].clientY;
                touchStart.current = null;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1);
              }}
              onTouchCancel={() => { touchStart.current = null; }}
            >
              <img src={locationImageUrl(photos[expanded].file)} alt={photos[expanded].alt} draggable={false} />
            </div>
            <div className={styles.navigation}>
              <button type="button" className={`${styles.arrow} ${styles.previous}`} onClick={() => move(-1)} aria-label="Foto anterior">‹</button>
              <span aria-live="polite">Foto {expanded + 1} de {photos.length}</span>
              <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => move(1)} aria-label="Próxima foto">›</button>
            </div>
          </div>
        )}
      </div>
    </dialog>,
    document.body
  );
}
