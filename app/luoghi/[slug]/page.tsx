import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardLuogo, PageHero, Placeholder, SectionHead } from "@/components/Cards";
import { MapView } from "@/components/MapView";
import { getBorgo, getLuogo, luoghi, tones } from "@/lib/site";
import { getArticle } from "@/lib/articoli";

export const dynamicParams = false;
export function generateStaticParams() {
  return luoghi.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/luoghi/[slug]">): Promise<Metadata> {
  const l = getLuogo((await params).slug);
  if (!l) return {};
  return { title: l.name, description: `${l.name}, ${getBorgo(l.borgo)?.name}: ${l.cat.toLowerCase()} ad Ascea.` };
}

export default async function LuogoPage({ params }: PageProps<"/luoghi/[slug]">) {
  const l = getLuogo((await params).slug);
  if (!l) notFound();
  const b = getBorgo(l.borgo)!;
  const blocks = l.article ? getArticle(l.article, l.name) : [];
  const altri = luoghi.filter((x) => x.slug !== l.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={l.name}
        image={l.image}
        tint={tones[b.tone].text}
        eyebrow={`${l.cat} · ${b.name}`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/luoghi/", label: "Luoghi" },
        ]}
      />

      <section className="section">
        <div className="wrap wrap--narrow article">
          {l.note && l.slug === "santuario-madonna-del-carmine" && (
            <>
              <Placeholder inline>{l.note}</Placeholder>
              <br />
            </>
          )}
          {blocks.length ? (
            blocks.map(([tag, html], k) => {
              const Tag = tag as "h2" | "h3" | "p";
              return <Tag key={k} dangerouslySetInnerHTML={{ __html: html }} />;
            })
          ) : (
            <Placeholder>Testo di approfondimento su {l.name}.</Placeholder>
          )}
          {l.note && l.slug !== "santuario-madonna-del-carmine" && (
            <>
              <br />
              <Placeholder inline>{l.note}</Placeholder>
            </>
          )}
        </div>
      </section>

      <section className="section section--sabbia section--compact">
        <div className="wrap wrap--narrow">
          <h2 className="h-section h-section--sm">Dove si trova</h2>
          <MapView only={`luogo:${l.slug}`} className="map map--small" label={`Posizione di ${l.name}`} />
          <p className="nota">Posizione indicativa, da verificare.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead title="Altri luoghi da vivere" />
          <div className="grid-luoghi">
            {altri.map((x, i) => (
              <CardLuogo key={x.slug} l={x} i={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
