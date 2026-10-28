import { useRef, useState } from "react";
import styles from "./LocationSection.module.css";

import { locationPhotos as photos, locationImageUrl } from "../locationPhotos";
import { LocationGalleryModal } from "./LocationGalleryModal";
const mapsUrl = "https://maps.app.goo.gl/cykNUMfir1NmssJq9";

export function LocationSection() {
  const [current, setCurrent] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function move(direction: number) {
    setCurrent((index) => (index + direction + photos.length) % photos.length);
  }

  return (
    <section id="local" className={styles.section} aria-labelledby="location-title">
      <div className={styles.heading}>
        <img src={locationImageUrl("pink-camera.png")} className={styles.camera} alt="" />
        <h2 id="location-title">Faça <span>uma visita!</span></h2>
        <p>Conheça nosso espaço feito com amor pra você e para nossos gatinhos!</p>
      </div>

      <div className={styles.galleryContainer}>
      <div
        className={styles.gallery}
        onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = touchStart.current.x - event.changedTouches[0].clientX;
          const verticalDistance = touchStart.current.y - event.changedTouches[0].clientY;
          touchStart.current = null;
          if (Math.abs(distance) > 50 && Math.abs(distance) > Math.abs(verticalDistance)) move(distance > 0 ? 1 : -1);
        }}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        {photos.map((photo, index) => (
          <img
            key={photo.file}
            src={locationImageUrl(photo.file)}
            alt={photo.alt}
            className={`${styles.photo} ${index === 0 ? styles.mainPhoto : ""} ${index === current ? styles.currentPhoto : ""}`}
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>

      <button type="button" className={styles.viewAll} onClick={() => setGalleryOpen(true)}>
        <span aria-hidden="true">▦</span> Ver todas as fotos
      </button>
      </div>

      <div className={styles.controls} aria-label="Fotos do local">
        <button type="button" className={styles.arrow} onClick={() => move(-1)} aria-label="Foto anterior">‹</button>
        <span className={styles.counter} aria-live="polite">Foto {current + 1} de {photos.length}</span>
        <button type="button" className={styles.arrow} onClick={() => move(1)} aria-label="Próxima foto">›</button>
      </div>

      {galleryOpen && <LocationGalleryModal photos={photos} onClose={() => setGalleryOpen(false)} />}

      <div className={styles.addressPanel}>
        <svg className={styles.pin} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" fill="currentColor" />
          <circle cx="12" cy="10" r="3" fill="white" />
        </svg>
        <div className={styles.addressText}>
          <h3>Gato Preto Cat Café</h3>
          <address>R. Espírito Santo, 1123 - Centro, Londrina - PR, 86020-420</address>
        </div>
        <a className={styles.mapsButton} href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Como chegar ao Gato Preto Cat Café no Google Maps (abre em nova aba)">
          Como chegar <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
