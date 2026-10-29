import type { Photo } from "./usePhotos";

export function photoSaveError(photos: Photo[], required = true) {
  if (required && photos.length === 0) return "Selecione pelo menos uma foto.";
  if (photos.length > 4) return "Selecione no máximo quatro fotos.";
  return "";
}
