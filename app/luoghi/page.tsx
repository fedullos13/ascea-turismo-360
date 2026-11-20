import type { Metadata } from "next";
import { PageHero } from "@/components/Cards";
import { LuoghiGrid } from "@/components/LuoghiGrid";
import { home } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scopri Ascea",
  description: "Storia, mare, architettura, spiritualità e natura: i luoghi da vivere ad Ascea.",
};

export default function Luoghi() {
  return (
    <>
      <PageHero title="Scopri Ascea" subtitle={home.luoghi.text} image="panorama-costa" />
      <section className="section">
        <div className="wrap">
          <LuoghiGrid />
        </div>
      </section>
    </>
  );
}
