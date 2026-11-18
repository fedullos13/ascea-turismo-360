import type { Metadata, Viewport } from "next";
import { Dosis } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

// Dosis (Google Fonts), lo stesso di Pisciotta Borgo Vivo: variabile 200–800, scaricato in fase di build e servito dal sito
const dosis = Dosis({ variable: "--font-dosis", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.claim}`, template: `%s – ${site.name}` },
  description:
    "Ascea Turismo 360 è il portale dedicato alla scoperta di Ascea: borghi, luoghi da vivere, news ed eventi e mappa.",
  openGraph: { type: "website", locale: "it_IT", siteName: site.name },
  // bozza: da togliere alla pubblicazione
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

// ?static in fondo all'indirizzo: pagina completa senza animazioni (screenshot di controllo)
const staticScript = `if(location.search.indexOf('static')>-1)document.documentElement.setAttribute('data-static','')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={dosis.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: staticScript }} />
      </head>
      <body>
        <a className="skip" href="#contenuto">
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto">{children}</main>
        <Footer />
        <SmoothScroll />
      </body>
    </html>
  );
}
