export const locationPhotos = [
  { file: "local1.png", alt: "Foto da Cafeteria Gato Preto Cat Café" },
  { file: "local2.png", alt: "Foto da Placa Gato Preto" },
  { file: "local3.png", alt: "Mesa com pedidos café da tarde" },
  { file: "local4.png", alt: "Mais um cantinho do Gato Preto Cat Café" },
  { file: "local5.png", alt: "Foto do espaço do Gato Preto Cat Café" },
  { file: "local6.png", alt: "Foto do catil Gato Preto" },
  { file: "local7.png", alt: "Foto da lojinha Catcafe" },
  { file: "local8.png", alt: "Mais um cantinho do Gato Preto Cat Café" },
  { file: "local9.png", alt: "Foto de gatinhos do Cat Café" },
];

export type LocationPhoto = (typeof locationPhotos)[number];

export function locationImageUrl(file: string) {
  return `${import.meta.env.BASE_URL}images/${file}`;
}
