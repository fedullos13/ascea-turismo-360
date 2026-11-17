import images from "@/lib/images.json";

type Name = keyof typeof images;

// Foto ottimizzata (generata da `npm run images`): AVIF, poi WebP, poi JPG, ognuno in più larghezze.
// Il browser sceglie il formato più leggero che supporta e la larghezza giusta per lo schermo (`sizes`).
export function Pic({
  name,
  alt = "",
  sizes = "100vw",
  priority = false,
  className,
}: {
  name: Name;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const { w, h, widths } = images[name];
  const set = (ext: string) => widths.map((x) => `/img/opt/${name}-${x}.${ext} ${x}w`).join(", ");
  const fallback = widths.find((x) => x >= 1200) ?? widths.at(-1);
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/img/opt/${name}-${fallback}.jpg`}
        srcSet={set("jpg")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}

export type PicName = Name;
