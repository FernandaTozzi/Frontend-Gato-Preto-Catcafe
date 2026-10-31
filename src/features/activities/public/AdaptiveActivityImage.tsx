import { useEffect, useState } from 'react';
import s from './PublicActivities.module.css';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/** Preserva fotos verticais inteiras e preenche o quadro com fotos horizontais. */
export function AdaptiveActivityImage({ src, alt, className = '' }: Props) {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | null>(null);
  useEffect(() => { setOrientation(null); }, [src]);

  return (
    <div className={`${s.adaptiveImage} ${orientation === 'portrait' ? s.portraitImage : s.landscapeImage} ${className}`}>
      {orientation === 'portrait' && <img className={s.imageBackdrop} src={src} alt="" aria-hidden="true" />}
      <img
        key={src}
        className={s.imageForeground}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={(event) => {
          const image = event.currentTarget;
          setOrientation(image.naturalHeight > image.naturalWidth ? 'portrait' : 'landscape');
        }}
        onError={() => setOrientation('landscape')}
      />
    </div>
  );
}
