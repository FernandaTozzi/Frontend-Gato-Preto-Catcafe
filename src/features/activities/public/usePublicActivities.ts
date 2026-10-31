import { useEffect, useState } from 'react';
import { getActivities } from '../activity.service';
import { newestFirst } from '../activity.public';
import type { Activity } from '../activity.types';
export function usePublicActivities() {
  const [items, setItems] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    getActivities().then(result => { if (active) setItems(newestFirst(result)); })
      .catch(() => { if (active) setError('Não foi possível carregar as atividades. Tente novamente mais tarde.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return { items, loading, error };
}
