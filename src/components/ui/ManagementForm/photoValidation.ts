import type { Photo } from "./usePhotos";

export function photoSaveError(photos: Photo[], required = true) {
  if (required && photos.length === 0) return "Selecione pelo menos uma foto.";
  if (photos.length > 1) return "O backend atual aceita uma foto. Mantenha apenas uma para salvar agora; as fotos extras serão habilitadas na próxima etapa.";
  return "";
}
