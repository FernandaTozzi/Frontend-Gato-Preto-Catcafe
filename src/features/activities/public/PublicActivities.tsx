import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Activity } from '../activity.types';
import { activityDate, activityHours, activityPhotos, coverPhoto } from '../activity.public';
import { ActivityDetailsModal } from './ActivityDetailsModal';
import { usePublicActivities } from './usePublicActivities';
import calendarIcon from '../../../assets/cat-calendar.png';
import catPose from '../../../assets/cat-pose.png';
import s from './PublicActivities.module.css';
import { AdaptiveActivityImage } from './AdaptiveActivityImage';
function PhotoCarousel({ activity }: {
  activity: Activity;
}) {
  const [index, setIndex] = useState(0);
  const images = activityPhotos(activity);
  return <div className={s.photoFrame}>
    <AdaptiveActivityImage
      src={images[index] || coverPhoto(activity)}
      alt={`${activity.titulo}: foto ${index + 1}`} />
    <span className={s.dateSticker}>📅 {activityDate(activity.data)}</span>
    {images.length > 1 && <><button
      className={`${s.arrow} ${s.prev}`}
      aria-label="Foto anterior"
      onClick={() => setIndex(i => (i - 1 + images.length) % images.length)}>‹</button><button
        className={`${s.arrow} ${s.next}`}
        aria-label="Próxima foto"
        onClick={() => setIndex(i => (i + 1) % images.length)}>›</button><span className={s.photoCounter}>{index + 1} / {images.length}</span></>}
  </div>;
}
export function ActivityPreviewCard({ activity, featured = false, onDetails }: {
  activity: Activity;
  featured?: boolean;
  onDetails: (a: Activity) => void;
}) {
  return <article className={`${s.card} ${featured ? s.featured : s.compact}`}>
    {featured ? <PhotoCarousel
      key={activity.id}
      activity={activity} /> : <div className={s.smallPhoto}><AdaptiveActivityImage
        src={coverPhoto(activity)}
        alt={activity.titulo} /><span className={s.dateSticker}>📅 {activityDate(activity.data)}</span></div>}
    <div className={s.cardBody}>
<h3>
{activity.titulo}
</h3>
<p className={s.meta}>
◷ 
{activityHours(activity)}
</p>
<p className={s.excerpt}>
{activity.descricao}
</p>
<button
      type="button"
      className={s.detailsButton}
      onClick={() => onDetails(activity)}>Ver detalhes <span aria-hidden="true">›</span></button>
</div>
  </article>;
}
export function SpecialActivitiesSection() {
  const { items, loading, error } = usePublicActivities();
  const [selected, setSelected] = useState<Activity | null>(null);
  return <section
    id="atividades-especiais"
    className={s.section}
    aria-labelledby="special-activities-title">
    <div
      className={s.blob}
      aria-hidden="true" />
    <header className={s.heading}><img
      src={calendarIcon}
      alt=""
      className={s.calendarIcon} /><h2 id="special-activities-title">
Atividades 
<span>
Especiais
</span>
</h2><p>
Eventos de um dia para curtir com café, arte e gatinhos.
</p><img
        src={catPose}
        alt=""
        className={s.catPose} /></header>
    {loading && <p
      className={s.status}
      role="status">Carregando atividades...</p>}
    {error && <p
      className={s.status}
      role="alert">{error}</p>}
    {!loading && !error && items.length === 0 && <p className={s.status}>Ainda não temos atividades cadastradas. Volte em breve! 🐾</p>}
    {items.length > 0 && <div className={s.showcase}>
      <div className={s.sideCards}>{items.slice(1, 3).map(a => <ActivityPreviewCard
        key={a.id}
        activity={a}
        onDetails={setSelected} />)}</div>
      <ActivityPreviewCard
        activity={items[0]}
        featured
        onDetails={setSelected} />
    </div>}
    <Link
      className={s.allButton}
      to="/atividades">s &nbsp; Ver todas as atividades &nbsp; ›</Link>
    {selected && <ActivityDetailsModal
      key={selected.id}
      activity={selected}
      onClose={() => setSelected(null)} />}
  </section>;
}
