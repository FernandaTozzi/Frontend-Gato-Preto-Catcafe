import { useRef, useState } from "react";
import styles from "./PhotoPicker.module.css";

import type { usePhotos } from "./usePhotos";

export function PhotoPicker({ value, max, disabled, error }: {
  value: ReturnType<typeof usePhotos>;
  max: 1 | 4;
  disabled: boolean;
  error?: string;
}) {
  const [uploadError, setUploadError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.root}>
      <div className={styles.heading}><h3>{max === 1 ? "Foto do item" : "Fotos"}</h3><span>{value.photos.length} de {max} {max === 1 ? "foto" : "fotos"}</span></div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple={max > 1} hidden disabled={disabled} onChange={event => {
        const files = Array.from(event.target.files || []);
        event.target.value = "";
        if (value.photos.length + files.length > max) { setUploadError(`Selecione no máximo ${max} ${max === 1 ? "foto" : "fotos"} no total.`); return; }
        if (files.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setUploadError("Use imagens JPG, PNG ou WEBP."); return; }
        if (files.some(file => file.size > 5 * 1024 * 1024)) { setUploadError("Cada foto deve ter no máximo 5 MB."); return; }
        setUploadError(""); value.add(files);
      }} />
      <div className={`${styles.grid} ${max === 1 ? styles.single : ""}`}>
        {value.photos.map((photo, index) => <div className={styles.photo} key={photo.id}><img src={photo.url} alt={`Foto ${index + 1} selecionada`} /><button type="button" className={styles.remove} disabled={disabled} onClick={() => { value.remove(photo.id); setUploadError(""); }} aria-label={`Remover foto ${index + 1}`}>×</button>{index === 0 && <span className={styles.badge}>Principal</span>}</div>)}
        {Array.from({ length: Math.max(0, max - value.photos.length) }, (_, i) => <button key={i} type="button" className={styles.add} disabled={disabled} onClick={() => input.current?.click()}><span aria-hidden="true">+</span>Adicionar foto</button>)}
      </div>
      <p className={styles.hint}>{max === 4 ? "A primeira foto será exibida na listagem. " : ""}JPG, PNG ou WEBP, até 5 MB por foto.</p>
      {(uploadError || error) && <p className={styles.error} role="alert">{uploadError || error}</p>}
      {max === 4 && value.photos.length > 1 && <p className={styles.notice}>As fotos extras estão em prévia. O salvamento de até 4 fotos será liberado após a atualização do backend.</p>}
    </div>
  );
}

