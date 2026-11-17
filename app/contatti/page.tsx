import type { Metadata } from "next";
import { SectionHead } from "@/components/Cards";
import { IconMail, IconPhone, IconPin } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contatti", description: "Contatti di Ascea Turismo 360." };

export default function Contatti() {
  return (
    <section className="section section--top">
      <div className="wrap wrap--narrow">
        <SectionHead as="h1" title="Contatti" />
        <div className="contact-grid">
          <div className="contact-card" data-reveal="1">
            <span className="ico">
              <IconPin />
            </span>
            <h3>Indirizzo</h3>
            <p>{site.address}</p>
          </div>
          <div className="contact-card" data-reveal="2">
            <span className="ico">
              <IconMail />
            </span>
            <h3>Email</h3>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="contact-card" data-reveal="3">
            <span className="ico">
              <IconPhone />
            </span>
            <h3>Telefono</h3>
            <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          </div>
        </div>
        <p className="center nota mt-cta">
          COMUNE DI ASCEA Partita IVA: <strong>{site.vat}</strong>
        </p>
      </div>
    </section>
  );
}
