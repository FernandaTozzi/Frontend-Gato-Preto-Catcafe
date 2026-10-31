import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Cat } from "../../cats/cat.types";
import { readCatGroup } from "../../cats/catGroup";
import { API_BASE_URL } from "../../../services/api";
import fallbackCat from "../../../assets/cat.png";
import styles from "./AdoptionSection.module.css";

export function catPhotos(cat: Cat): string[] {
  const files = cat.fotos?.filter(Boolean) ?? [];
  if (files.length === 0 && cat.foto) files.push(cat.foto);
  return [...new Set(files)].map((file) => {
    if (/^(https?:\/\/|data:|blob:)/i.test(file)) return file;
    return `${API_BASE_URL}/uploads/${file.replace(/^\/?uploads\//, "").replace(/^\/+/, "")}`;
  });
}

export function catTitle(cat: Cat): string {
  const names = readCatGroup(cat).map((member) => member.nome);
  if (names.length < 2) return names[0] || "Gatinho";
  return `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`;
}

export function catAge(dateOfBirth: string): string {
  if (!dateOfBirth) return "Idade não informada";
  const [year, month, day] = dateOfBirth.slice(0, 10).split("-").map(Number);
  if (![year, month, day].every(Number.isInteger)) return "Idade não informada";
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  if (birth.getFullYear() !== year || birth.getMonth() !== month - 1 || birth.getDate() !== day || birth > today) {
    return "Idade não informada";
  }
  let years = today.getFullYear() - year;
  let months = today.getMonth() - month;
  if (today.getDate() < day) months--;
  if (months < 0) { years--; months += 12; }
  return [
    years > 0 ? `${years} ${years === 1 ? "ano" : "anos"}` : "",
    months > 0 || years === 0 ? `${months} ${months === 1 ? "mês" : "meses"}` : "",
  ].filter(Boolean).join(" e ");
}

type Props = { cat: Cat; onClose: () => void };

export function CatDetailsModal({ cat, onClose }: Props) {
  const photos = catPhotos(cat);
  const gallery = photos.length ? photos : [fallbackCat];
  const [index, setIndex] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);
  const title = catTitle(cat);
  const members = readCatGroup(cat);
  const isGroup = cat.tipoAdocao === "CONJUNTA";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % gallery.length);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [gallery.length, onClose]);

  const showPrevious = () => setIndex((current) => (current - 1 + gallery.length) % gallery.length);
  const showNext = () => setIndex((current) => (current + 1) % gallery.length);

  return createPortal(
    <div className={styles.modalBackdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={styles.catModal} role="dialog" aria-modal="true" aria-labelledby="cat-modal-title">
        <button ref={closeButton} className={styles.modalClose} type="button" onClick={onClose} aria-label="Fechar detalhes">×</button>
        <div className={styles.modalColumns}>
          <div className={styles.modalGallery}>
            <div className={styles.modalMainPhoto}>
              <img src={gallery[index]} alt={`${title} — foto ${index + 1} de ${gallery.length}`} onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackCat;
              }} />
              {gallery.length > 1 && (
                <>
                  <button className={`${styles.modalArrow} ${styles.modalPrev}`} type="button" onClick={showPrevious} aria-label="Foto anterior">‹</button>
                  <button className={`${styles.modalArrow} ${styles.modalNext}`} type="button" onClick={showNext} aria-label="Próxima foto">›</button>
                  <span className={styles.modalCounter}>{index + 1} / {gallery.length}</span>
                </>
              )}
            </div>
            {gallery.length > 1 && (
              <div className={styles.modalThumbnails} aria-label="Fotos do gatinho">
                {gallery.map((photo, photoIndex) => (
                  <button
                    type="button"
                    key={`${photo}-${photoIndex}`}
                    className={photoIndex === index ? styles.modalThumbActive : ""}
                    aria-label={`Mostrar foto ${photoIndex + 1}`}
                    aria-pressed={photoIndex === index}
                    onClick={() => setIndex(photoIndex)}
                  >
                    <img src={photo} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={styles.modalInfo}>
            <span className={styles.modalEyebrow}>Adoção responsável</span>
            <h2 id="cat-modal-title">{title}</h2>
            <div className={styles.memberTags} aria-label="Nomes e gêneros dos gatinhos">
              {members.map((member, memberIndex) => (
                <span className={styles.memberTag} key={`${member.nome}-${memberIndex}`}>
                  {member.nome} {member.genero === "MACHO" ? "♂" : "♀"}
                </span>
              ))}
            </div>
            <p className={styles.modalAge}>{catAge(cat.idade)}</p>
            <div className={styles.badges}>
              <span className={styles.adoptionBadge}>{isGroup ? "Adoção conjunta" : "Adoção simples"}</span>
              <span className={styles.availableBadge}>Disponível</span>
            </div>
            <h3>Sobre {isGroup ? "os gatinhos" : "o gatinho"}</h3>
            <p className={styles.modalDescription}>{cat.descricao || "Sem descrição cadastrada."}</p>
            <p className={styles.modalFooter}>Gato Preto Cat Café • Adoção responsável 🐾</p>
          </div>
        </div>
      </section>
    </div>,
    document.body
  );
}
