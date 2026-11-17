import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Pic, type PicName } from "@/components/Pic";
import { IconExternal } from "@/components/Icons";
import { tones, type Borgo, type Luogo, type News } from "@/lib/site";

const reveal = (i: number) => String((i % 3) + 1);

export function CardBorgo({ b, i = 0, sizes = "(max-width: 1100px) 45vw, 20vw" }: { b: Borgo; i?: number; sizes?: string }) {
  return (
    <Link className="card-borgo" href={`/borghi/${b.slug}/`} style={{ "--c": tones[b.tone].text } as CSSProperties} data-reveal={reveal(i)}>
      <div className="card-borgo__img">
        <Pic name={b.image} alt={b.name} sizes={sizes} />
      </div>
      <h3>{b.name}</h3>
      <p>{b.description}</p>
    </Link>
  );
}

export function CardLuogo({ l, i = 0, sizes = "(max-width: 900px) 50vw, 33vw" }: { l: Luogo; i?: number; sizes?: string }) {
  return (
    <Link className="card-luogo" href={`/luoghi/${l.slug}/`} data-reveal={reveal(i)}>
      <div className="card-luogo__img">
        <Pic name={l.image} alt={l.name} sizes={sizes} />
      </div>
      <div className="card-luogo__body">
        <span className="tag">{l.cat}</span>
        <h3>{l.name}</h3>
      </div>
    </Link>
  );
}

export function CardNews({ n, i = 0 }: { n: News; i?: number }) {
  const title = n.title ?? "[Titolo del reel da definire]";
  return (
    <a className="card-news" href={n.url} target="_blank" rel="noopener" data-reveal={reveal(i)}>
      <div className="card-news__img">
        <Pic name={n.image} alt={n.title ?? "Ascea"} sizes="(max-width: 600px) 100vw, 33vw" />
        <span className="badge-ext">
          <IconExternal /> Esterno
        </span>
      </div>
      <div className="card-news__body">
        <span className={n.type === "Video" ? "pill pill--video" : "pill"}>{n.type}</span>
        <h3>{title}</h3>
        <span className="fonte">{n.source}</span>
        <span className="read">
          Leggi l’articolo completo <IconExternal />
        </span>
      </div>
    </a>
  );
}

export function PageHero({
  title,
  subtitle,
  image,
  tint,
  crumbs,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  image: PicName;
  tint?: string;
  crumbs?: { href: string; label: string }[];
  eyebrow?: string;
}) {
  return (
    <section className={tint ? "page-hero page-hero--tint" : "page-hero"} style={tint ? ({ "--c": tint } as CSSProperties) : undefined}>
      <Pic name={image} sizes="100vw" priority />
      <div className="wrap">
        {crumbs && (
          <nav className="breadcrumb" aria-label="Percorso">
            {crumbs.map((c, k) => (
              <span key={c.href}>
                {k > 0 && " / "}
                <Link href={c.href}>{c.label}</Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}

// Riquadro tratteggiato per i testi che devono ancora arrivare
export function Placeholder({ who = "Ilaria", children, inline }: { who?: string; children: ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? "placeholder placeholder--inline" : "placeholder"}>
      <strong>Testo in arrivo · {who}</strong>
      {children}
    </div>
  );
}

export function SectionHead({ title, text, as: As = "h2" }: { title: string; text?: string; as?: "h1" | "h2" }) {
  return (
    <div className="section-head" data-reveal="1">
      <As className="h-section">{title}</As>
      {text && <p className="lead">{text}</p>}
    </div>
  );
}
