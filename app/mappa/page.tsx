import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Placeholder, SectionHead } from "@/components/Cards";
import { MapView } from "@/components/MapView";
import { borghi, home, tones } from "@/lib/site";

export const metadata: Metadata = { title: "Mappa", description: "La mappa di Ascea: borghi, luoghi da vivere e punti di interesse." };

export default function Mappa() {
  return (
    <section className="section section--top">
      <div className="wrap">
        <SectionHead as="h1" title={home.mappa.title} text={home.mappa.text} />
        <MapView filters className="map map--full" label="Mappa completa di Ascea" />
        <div className="map-legend">
          {borghi.map((b) => (
            <span key={b.slug} style={{ "--c": tones[b.tone].pin } as CSSProperties}>
              <i />
              {b.name}
            </span>
          ))}
          <span style={{ "--c": "#0B6585" } as CSSProperties}>
            <i />
            Luoghi da vivere
          </span>
        </div>
        <div className="mt-cta">
          <Placeholder who="Francesco/Ilaria" inline>
            Strutture ricettive sulla mappa: servono gli indirizzi delle strutture per posizionarle. Le posizioni dei luoghi sono indicative e vanno verificate.
          </Placeholder>
        </div>
      </div>
    </section>
  );
}
