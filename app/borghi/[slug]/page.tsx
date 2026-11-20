import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pic } from "@/components/Pic";
import { CardBorgo, PageHero, Placeholder, SectionHead } from "@/components/Cards";
import { borghi, getBorgo, getLuogo, tones, type Luogo } from "@/lib/site";
import { getExcerpt } from "@/lib/articoli";

export const dynamicParams = false;
export function generateStaticParams() {
  return borghi.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/borghi/[slug]">): Promise<Metadata> {
  const b = getBorgo((await params).slug);
  return b ? { title: b.name, description: b.description } : {};
}

// Scheda borgo come quelle di Pisciotta: apertura colorata, testo, fascia "luoghi simbolo", righe alternate
export default async function BorgoPage({ params }: PageProps<"/borghi/[slug]">) {
  const b = getBorgo((await params).slug);
  if (!b) notFound();
  const color = tones[b.tone].text;
  const list = b.luoghi.map(getLuogo).filter(Boolean) as Luogo[];

  return (
    <>
      <PageHero
        title={b.name}
        subtitle={b.description}
        image={b.image}
        tint={color}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/borghi/", label: "Paesi" },
        ]}
      />

      <section className="section">
        <div className="wrap wrap--narrow article">
          <Placeholder>Testo di approfondimento su {b.name}: storia, cosa vedere, tradizioni ed eventi (come nelle pagine borgo di Pisciotta Borgo Vivo).</Placeholder>
        </div>
      </section>

      {list.length > 0 && (
        <>
          {/* titolo della fascia: da validare con Ilaria */}
          <section className="band" style={{ "--c": color } as CSSProperties}>
            <div className="wrap">
              <h2>I luoghi simbolo di {b.name}</h2>
            </div>
          </section>
          <section className="section">
            <div className="wrap rows">
              {list.map((l, i) => {
                const ex = l.article ? getExcerpt(l.article) : [];
                return (
                  <div key={l.slug} className={`split row-luogo${i % 2 ? " split--rev" : ""}`} style={{ "--c": color } as CSSProperties}>
                    <div data-reveal="1">
                      <span className="tag">{l.cat}</span>
                      <h3>{l.name}</h3>
                      <div className="prose">
                        {ex.length ? (
                          ex.map((p, k) => <p key={k} dangerouslySetInnerHTML={{ __html: p }} />)
                        ) : (
                          <Placeholder inline>Breve introduzione a {l.name}.</Placeholder>
                        )}
                      </div>
                      <Link className="btn btn--sm" href={`/luoghi/${l.slug}/`}>
                        Scopri di più
                      </Link>
                    </div>
                    <div className="split__media" data-reveal="2">
                      <Pic name={l.image} alt={l.name} sizes="(max-width: 900px) 100vw, 45vw" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      <section className="section section--sabbia">
        <div className="wrap">
          <SectionHead title="Gli altri paesi" />
          <div className="grid-borghi grid-borghi--4">
            {borghi
              .filter((x) => x.slug !== b.slug)
              .map((x, i) => (
                <CardBorgo key={x.slug} b={x} i={i} sizes="(max-width: 1100px) 45vw, 25vw" />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
