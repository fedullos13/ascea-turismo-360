import type { Metadata } from "next";
import { PageHero, Placeholder } from "@/components/Cards";
import { home, site } from "@/lib/site";
import { asset } from "@/lib/base";

export const metadata: Metadata = { title: "Il progetto", description: "Ascea Turismo 360: una finestra sul territorio." };

export default function Progetto() {
  const { intro } = home;
  return (
    <>
      <PageHero title="Il progetto" subtitle={site.claim} image="panoramica-velia" />
      <section className="section">
        <div className="wrap wrap--narrow">
          <div className="box-progetto" data-reveal="1">
            <h2>{intro.title.join(" ")}</h2>
            <div className="prose">
              {intro.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
          <div className="mt-cta" data-reveal="2">
            <Placeholder>Eventuali sezioni aggiuntive sul progetto (obiettivi, finanziamento, partner), come nella pagina “Il progetto” di Pisciotta Borgo Vivo.</Placeholder>
          </div>
          <p className="center mt-cta">{site.funding}</p>
          <div className="loghi-ente">
            <img src={asset("/brand/logo-comune.png")} alt="Comune di Ascea" loading="lazy" />
            <img src={asset("/brand/logo-ministero.jpg")} alt="Ministero dell’Interno" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
