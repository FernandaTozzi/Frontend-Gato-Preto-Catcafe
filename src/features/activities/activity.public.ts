import type { Activity } from './activity.types';
import { API_BASE_URL } from '../../services/api';
import fallback from '../../assets/atividade-especial.png';

export const newestFirst = (items: Activity[]) => [...items].sort((a, b) => String(b.data ?? '').localeCompare(String(a.data ?? '')) || b.id - a.id);
export const activityPhotos = (a: Activity): string[] => {
  const paths = a.imagens?.length ? a.imagens : a.imagem ? [a.imagem] : [];
  return paths.map(path => /^https?:\/\//.test(path) ? path : `${API_BASE_URL}/uploads/${path.replace(/^\/+/, '')}`);
};
export const coverPhoto = (a: Activity) => activityPhotos(a)[0] || fallback;
export const activityDate = (date: string) => {
  if (!date) return 'Data não informada';
  const parsed = new Date(`${date}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};
export const activityHours = (a: Activity) => `${(a.horarioInicio || '--:--').slice(0, 5)} às ${(a.horarioFim || '--:--').slice(0, 5)}`;
