import { useState } from 'react';
import Header from '../../../components/layout/Header/Header';
import type { Activity } from '../activity.types';
import { ActivityDetailsModal } from './ActivityDetailsModal';
import { usePublicActivities } from './usePublicActivities';
import { activityDate, activityHours, coverPhoto } from '../activity.public';
import calendarIcon from '../../../assets/cat-calendar.png';
import s from './PublicActivities.module.css';
import { AdaptiveActivityImage } from './AdaptiveActivityImage';
export default function PublicActivitiesPage() {
  const { items, loading, error } = usePublicActivities();
  const [selected, setSelected] = useState<Activity | null>(null);
  return <div className={s.pageBackground}><div className={s.pageShell}><Header /><main className={s.listPage}>
    <header className={s.listHeading}><img src={calendarIcon} alt="" /><h1>Todas as atividades especiais</h1><p>Confira os eventos do Gato Preto, dos mais recentes aos mais antigos.</p></header>
    {loading && <p role="status">Carregando atividades...</p>}{error && <p role="alert">{error}</p>}
    {!loading && !error && items.length === 0 && <p>Nenhuma atividade cadastrada por enquanto.</p>}
    <div className={s.activityGrid}>{items.map(a => <article key={a.id} className={s.listCard}>
      <AdaptiveActivityImage className={s.listCover} src={coverPhoto(a)} alt={a.titulo} /><div className={s.listCardBody}><span className={s.meta}>📅 {activityDate(a.data)} · ◷ {activityHours(a)}</span><h2>{a.titulo}</h2><p>{a.descricao}</p><button className={s.detailsButton} onClick={() => setSelected(a)}>Ver detalhes ›</button></div>
    </article>)}</div>
    {selected && <ActivityDetailsModal key={selected.id} activity={selected} onClose={() => setSelected(null)} />}
  </main></div></div>;
}
