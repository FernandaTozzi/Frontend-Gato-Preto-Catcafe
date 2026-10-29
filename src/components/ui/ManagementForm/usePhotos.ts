import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../../services/api";

export type Photo = { id: string; url: string; file?: File; existing?: string };

export function usePhotos(existing?: string | string[] | null) {
  const [photos, setPhotos] = useState<Photo[]>(() => (Array.isArray(existing) ? existing : existing ? [existing] : []).map(path => ({ id: path, existing: path, url: `${API_BASE_URL}/uploads/${path}` })));
  const urls = useRef(new Set<string>());
  useEffect(() => {
    const created = urls.current;
    return () => { created.forEach(url => URL.revokeObjectURL(url)); created.clear(); };
  }, []);

  function add(files: File[]) {
    const additions = files.map(file => {
      const url = URL.createObjectURL(file);
      urls.current.add(url);
      return { id: url, url, file };
    });
    setPhotos(previous => [...previous, ...additions]);
  }

  function remove(id: string) {
    const photo = photos.find(item => item.id === id);
    if (photo?.file) { URL.revokeObjectURL(photo.url); urls.current.delete(photo.url); }
    setPhotos(previous => previous.filter(item => item.id !== id));
  }

  return { photos, add, remove };
}

