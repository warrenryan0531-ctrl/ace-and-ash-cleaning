import Image from 'next/image';

/* Full-bleed confidence (principle 4). Falls back to a deliberate parchment
   plate + stationery caption if the photograph is not in place yet, so the
   composition never collapses into a broken-image grid. */
export default function Photo({
  src, alt, ratio = '4 / 5', priority, className = '', sizes = '100vw', grade = 'warm', caption,
}: {
  src?: string; alt: string; ratio?: string; priority?: boolean;
  className?: string; sizes?: string; grade?: 'warm' | 'grey'; caption?: string;
}) {
  return (
    <figure className={`plate ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes}
          className={grade === 'grey' ? 'grayscale-[0.92] contrast-[1.03]' : ''}
          style={{ objectFit: 'cover' }} />
      ) : (
        <span className="absolute inset-0 grid place-items-center bg-[#ebe5db] p-8 text-center">
          <span className="stationery block max-w-[26ch] leading-relaxed">{alt}</span>
        </span>
      )}
      {caption && (
        <figcaption className="absolute bottom-4 left-4 right-4 stationery stationery-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
