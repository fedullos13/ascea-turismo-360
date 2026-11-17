import type { Metadata } from "next";
import { Pic } from "@/components/Pic";
import { PageHero, Placeholder, SectionHead } from "@/components/Cards";
import { soggiornare, strutture } from "@/lib/site";

export const metadata: Metadata = { title: "Dove soggiornare", description: "Le strutture ricettive di Ascea dove soggiornare." };

export default function DoveSoggiornare() {
  return (
    <>
      <PageHero title={soggiornare.title} image="panorama-costa" />
      <section className="section">
        <div className="wrap">
          <SectionHead title={soggiornare.subtitle} text={soggiornare.text} />
          <div className="intro-note">
            <Placeholder inline>
              Introduzione alla sezione “Dove soggiornare”. Il testo qui sopra e l’elenco delle strutture sono presi dal sito attuale (pagina Turismo rurale); “Scopri di più” porta per ora alle schede del sito attuale.
            </Placeholder>
          </div>
          <div className="grid-strutture">
            {strutture.map((s, i) => (
              <a key={s.name} className="card-str" href={s.url} data-reveal={String((i % 3) + 1)}>
                <div className="card-str__img">
                  <Pic name={s.image} alt={s.name} sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" />
                </div>
                <div className="card-str__body">
                  <h3>{s.name}</h3>
                  <span className="read">Scopri di più →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
