import type { Metadata } from "next";
import { CardBorgo, PageHero } from "@/components/Cards";
import { borghi, home } from "@/lib/site";

export const metadata: Metadata = {
  title: "I borghi",
  description: "Ascea Paese, Ascea Marina, Mandia, Terradura e Catona: i borghi di Ascea.",
};

export default function Borghi() {
  return (
    <>
      <PageHero title={home.borghi.title} subtitle={home.borghi.subtitle} image="panoramica-golfo" />
      <section className="section">
        <div className="wrap">
          <div className="grid-borghi-big">
            {borghi.map((b, i) => (
              <CardBorgo key={b.slug} b={b} i={i} sizes="(max-width: 760px) 100vw, 45vw" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
