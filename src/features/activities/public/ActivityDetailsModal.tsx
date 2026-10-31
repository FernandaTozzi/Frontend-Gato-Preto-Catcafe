import { useEffect, useState } from 'react';
import type { Activity } from '../activity.types';
import { activityDate, activityHours, activityPhotos } from '../activity.public';
import fallback from '../../../assets/atividade-especial.png';
import s from './PublicActivities.module.css';
import { AdaptiveActivityImage } from './AdaptiveActivityImage';
type Props = {
  activity: Activity;
  onClose: () => void;
};
export function ActivityDetailsModal({ activity, onClose }: Props) {
  const photos = activityPhotos(activity);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')
        onClose();
      if (e.key === 'ArrowRight')
        setIndex(i => (i + 1) % Math.max(photos.length, 1));
      if (e.key === 'ArrowLeft')
        setIndex(i => (i - 1 + Math.max(photos.length, 1)) % Math.max(photos.length, 1));
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKey); };
  }, [onClose, photos.length]);
  return (<div
    className={s.backdrop}
    onMouseDown={e => {
      if (e.target === e.currentTarget)
        onClose();
    }}>
    <section
      className={s.modal}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes: ${activity.titulo}`}>
      <button
        type="button"
        className={s.close}
        aria-label="Fechar detalhes"
        onClick={onClose}>×</button>
      <div className={s.modalColumns}>
        <div>
          <div className={s.modalPhoto}><AdaptiveActivityImage
            src={photos[index] || fallback}
            alt={`${activity.titulo} - foto ${index + 1}`} />
            {photos.length > 1 && <><button
              className={`${s.arrow} ${s.prev}`}
              aria-label="Foto anterior"
              onClick={() => setIndex(i => (i - 1 + photos.length) % photos.length)}>‹</button><button
                className={`${s.arrow} ${s.next}`}
                aria-label="Próxima foto"
                onClick={() => setIndex(i => (i + 1) % photos.length)}>›</button></>}
          </div>
          {photos.length > 1 && <div className={s.thumbnails}>{photos.map((photo, i) => <button
            key={photo + i}
            className={i === index ? s.thumbSelected : ''}
            onClick={() => setIndex(i)}
            aria-label={`Exibir foto ${i + 1}`}
            aria-pressed={i === index}><img
              src={photo}
              alt="" /></button>)}</div>}
        </div>
        <div className={s.modalInfo}>
<span className={s.eyebrow}>
Atividade especial
</span>
<h2>
{activity.titulo}
</h2>
<p className={s.meta}>
📅 
{activityDate(activity.data)}
</p>
<p className={s.meta}>
◷ 
{activityHours(activity)}
</p>
<h3>
Sobre a atividade
</h3>
<p className={s.description}>
{activity.descricao}
</p>
<p className={s.modalFoot}>
Gato Preto Cat Café • Um dia especial com muitos gatinhos! 🐾
</p>
</div>
      </div>
    </section>
  </div>);
}
