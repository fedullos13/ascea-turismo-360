import Link from "next/link";
import { Pic } from "@/components/Pic";
import { CardBorgo, CardLuogo, CardNews, SectionHead } from "@/components/Cards";
import { MapView } from "@/components/MapView";
import { HeroTrack } from "@/components/HeroTrack";
import { borghi, heroCols, home, luoghi, news } from "@/lib/site";

// Home: stessa sequenza di sezioni di pisciottaborgovivo.it, copy di Ilaria
export default function Home() {
  const { hero, intro } = home;
  return (
    <>
      {/* Apertura: collage di foto che scorre in loop + titolo */}
      <section className="hero" aria-labelledby="hero-title">
        <HeroTrack>
          {[0, 1].map((copy) => (
            <div key={copy} className="hero-group">
              {heroCols.map((col, i) => (
                <div key={i} className={`hero-col${col.size === "xl" ? " hero-col--xl" : ""}${col.hideSm ? " hero-col--hide-sm" : ""}`}>
                  {col.pics.map((p) => (
                    <figure key={p.name} className={`r-${p.ratio}`}>
                      <Pic name={p.name} sizes={col.size === "xl" ? "(max-width: 760px) 60vw, 25vw" : "(max-width: 760px) 30vw, 13vw"} priority />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </HeroTrack>
        <div className="wrap hero-copy">
          <h1 id="hero-title" className="h-display">
            {hero.title[0]} <b>{hero.title[1]}</b>
          </h1>
          <p className="lead">{hero.subtitle}</p>
          <div className="btn-row">
            <Link className="btn btn--pieno" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </Link>
            <Link className="btn btn--arancio" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Il progetto */}
      <section className="section">
        <div className="wrap split">
          <div data-reveal="1">
            <h2 className="h-section">
              {intro.title[0]}
              <br />
              {intro.title[1]}
            </h2>
            <div className="prose">
              {intro.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            <Link className="btn" href={intro.cta.href}>
              {intro.cta.label}
            </Link>
          </div>
          <div className="split__media" data-reveal="2">
            <Pic name={intro.image} alt="Panorama di Ascea dagli scavi di Velia" sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      {/* I borghi */}
      <section className="section section--sabbia">
        <div className="wrap">
          <SectionHead title={home.borghi.title} text={home.borghi.subtitle} />
          <div className="grid-borghi">
            {borghi.map((b, i) => (
              <CardBorgo key={b.slug} b={b} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* I luoghi da vivere */}
      <section className="section">
        <div className="wrap">
          <SectionHead title={home.luoghi.title} text={home.luoghi.text} />
          <div className="grid-luoghi grid-luoghi--home">
            {luoghi.slice(0, 5).map((l, i) => (
              <CardLuogo key={l.slug} l={l} i={i} sizes={i < 2 ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 50vw, 33vw"} />
            ))}
          </div>
          <div className="center mt-cta">
            <Link className="btn" href={home.luoghi.cta.href}>
              {home.luoghi.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* News ed eventi */}
      <section className="section section--sabbia">
        <div className="wrap">
          <SectionHead title={home.news.title} text={home.news.text} />
          <div className="grid-news">
            {news.map((n, i) => (
              <CardNews key={n.url} n={n} i={i} />
            ))}
          </div>
          <div className="center mt-cta">
            <Link className="btn" href={home.news.cta.href}>
              {home.news.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Esplora la mappa */}
      <section className="section">
        <div className="wrap">
          <div className="map-box" data-reveal="1">
            <div>
              <h2 className="h-section">{home.mappa.title}</h2>
              <p className="lead">{home.mappa.text}</p>
              <Link className="btn btn--pieno" href={home.mappa.cta.href}>
                {home.mappa.cta.label}
              </Link>
            </div>
            <MapView />
          </div>
        </div>
      </section>
    </>
  );
}
