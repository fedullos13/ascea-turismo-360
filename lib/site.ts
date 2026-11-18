// Tutti i testi e i dati del sito.
// - Home: copy di Ilaria (Google Doc "HOME PAGE"), inserito alla lettera: non riscrivere.
// - Schede luoghi: testi del sito attuale asceaturismo.com (lib/articoli.json).
// - Dove soggiornare / Contatti: dati del sito attuale.
import type { PicName } from "@/components/Pic";

export const site = {
  name: "Ascea Turismo 360",
  url: "https://asceaturismo.com",
  claim: "La guida ufficiale di Ascea",
  email: "info@asceaturismo.com",
  phone: "0974 977008",
  phoneHref: "+390974977008",
  address: "Via XXIV Maggio, 84046 Ascea SA",
  vat: "03519370658",
  footerClaim: "Ascea Turismo 360 è un progetto finanziato dal Ministero dell’interno e gestito dal Comune di Ascea.",
  funding: "Ascea Turismo 360 è un progetto finanziato dal Ministero dell’interno e gestito dal Comune di Ascea.",
  // da avere: link delle pagine social
  social: { facebook: "", instagram: "" },
  legal: [
    { label: "Cookie policy", href: "https://asceaturismo.com/cookie-policy/" },
    { label: "Dichiarazione sulla privacy", href: "https://asceaturismo.com/privacy-policy/" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/borghi/", label: "Borghi" },
  { href: "/luoghi/", label: "Luoghi" },
  { href: "/blog/", label: "Blog" },
  { href: "/il-progetto/", label: "Il progetto" },
  { href: "/mappa/", label: "Mappa" },
];

// Colori del logo. `text`: variante leggibile su fondo chiaro (titoli); `pin`: colore pieno per la mappa.
export const tones = {
  arancio: { text: "#C9431F", pin: "#EA5E3B" },
  azzurro: { text: "#0B8DB5", pin: "#21BAE3" },
  verde: { text: "#1A8379", pin: "#26B2A6" },
  viola: { text: "#7C4F9F", pin: "#7C4F9F" },
  giallo: { text: "#B87A06", pin: "#F2A81D" },
} as const;
export type Tone = keyof typeof tones;

/* ------------------------------------------------------------------ HOME (copy di Ilaria) */
export const home = {
  hero: {
    title: ["Ascea Turismo", "360"],
    subtitle: "La guida ufficiale di Ascea",
    ctaPrimary: { label: "Scopri il progetto", href: "/il-progetto/" },
    ctaSecondary: { label: "Scopri Ascea", href: "/borghi/" },
  },
  intro: {
    title: ["Ascea Turismo 360:", "una finestra sul territorio"],
    // HTML con i grassetti del doc
    paragraphs: [
      "<strong>Ascea Turismo 360 </strong>è il<strong> portale </strong>dedicato alla<strong> scoperta di Ascea. </strong>Una finestra sul territorio pensata per accompagnare visitatori e viaggiatori alla scoperta di tutte le sue bellezze, dai luoghi più iconici ai meno conosciuti e alle esperienze da vivere.",
      "La <strong>lunghissima spiaggia di Ascea Marina,</strong> il fascino del<strong> Parco Archeologico di Velia</strong>, i percorsi della<strong> rete sentieristica</strong>, <strong>Palazzo De Dominicis-Ricci</strong> ad <strong>Ascea Capoluogo</strong>, il <strong>Santuario della Madonna del Carmine</strong> a <strong>Catona</strong> sono solo alcuni dei luoghi di interesse storico, culturale e naturalistico presenti nel portale.",
      "Uno strumento che attraverso approfondimenti e informazioni utili, vuole essere il punto di riferimento per chi desidera conoscere Ascea.<br>Esplora, visita, innamorati di Ascea.",
    ],
    cta: { label: "Scopri di più", href: "/il-progetto/" },
    image: "panoramica-velia" as PicName,
  },
  borghi: { title: "I borghi", subtitle: "Il fascino di Ascea: borghi da vivere, storie da raccontare" },
  luoghi: {
    title: "I luoghi da vivere",
    text: "Un itinerario suggestivo tra le acque cristalline di Ascea Marina, l'eredità millenaria del Parco Archeologico di Elea-Velia e i sentieri immersi nella macchia mediterranea, dove natura, storia e cultura si incontrano.",
    cta: { label: "Scopri tutti i luoghi", href: "/luoghi/" },
  },
  news: {
    title: "News ed eventi",
    text: "Le notizie che raccontano Ascea, le sue frazioni e località, gli eventi e le esperienze che si possono vivere sul territorio.",
    cta: { label: "Tutte le news", href: "/blog/" }, // etichetta da validare con Ilaria
  },
  mappa: {
    title: "Esplora la mappa",
    text: "Scopri i luoghi da vivere e i punti di interesse di Ascea.",
    cta: { label: "Apri la mappa completa", href: "/mappa/" },
  },
};

// Foto della fascia d'apertura, colonna per colonna (come Pisciotta Borgo Vivo)
export const heroCols: { size?: "xl"; hideSm?: boolean; pics: { name: PicName; ratio: "tall" | "sq" | "wide" | "big" }[] }[] = [
  { hideSm: true, pics: [{ name: "telegrafo", ratio: "tall" }] },
  { pics: [{ name: "scogliera", ratio: "sq" }, { name: "sentiero-aurella", ratio: "wide" }] },
  { size: "xl", pics: [{ name: "velia-parco", ratio: "big" }] },
  { pics: [{ name: "palazzo-ricci", ratio: "sq" }, { name: "catona", ratio: "wide" }] },
  { pics: [{ name: "sentiero-innamorati", ratio: "tall" }] },
  { pics: [{ name: "santuario-carmine", ratio: "tall" }] },
  { hideSm: true, pics: [{ name: "ascea-marina", ratio: "sq" }, { name: "mandia", ratio: "wide" }] },
];

/* ------------------------------------------------------------------ BORGHI (descrizioni di Ilaria) */
export type Borgo = {
  slug: string;
  name: string;
  tone: Tone;
  image: PicName;
  description: string;
  lat: number;
  lng: number;
  luoghi: string[];
};

export const borghi: Borgo[] = [
  {
    slug: "ascea-paese", name: "Ascea Paese", tone: "arancio", image: "ascea-paese", // foto Pro Loco: da verificare
    description: "L’affascinante centro storico dove perdersi tra vicoli suggestivi, antiche tradizioni e scorci storici unici.",
    lat: 40.1416, lng: 15.1858, luoghi: ["palazzo-ricci", "sentiero-aurella"],
  },
  {
    slug: "ascea-marina", name: "Ascea Marina", tone: "azzurro", image: "ascea-marina",
    description: "Dove convivono la lunga spiaggia di sabbia dorata e la storia millenaria del Parco Archeologico di Velia.",
    lat: 40.1454, lng: 15.1679, luoghi: ["parco-archeologico-velia", "la-scogliera", "sentiero-degli-innamorati", "museo-del-mare"],
  },
  {
    slug: "mandia", name: "Mandia", tone: "verde", image: "mandia",
    description: "La frazione più interna incastonata tra uliveti secolari e rigogliosi castagneti.",
    lat: 40.1538, lng: 15.2499, luoghi: [],
  },
  {
    slug: "terradura", name: "Terradura", tone: "viola", image: "terradura",
    description: "Un’oasi rurale ricca di storia e paesaggi incontaminati con le sue radici italo-greche.",
    lat: 40.1566, lng: 15.2179, luoghi: [],
  },
  {
    slug: "catona", name: "Catona", tone: "giallo", image: "catona",
    description: "Un'oasi di pace e spiritualità, custode del Santuario della Madonna del Carmine.",
    lat: 40.1497, lng: 15.2361, luoghi: ["santuario-madonna-del-carmine", "sentiero-del-carmelo"],
  },
];

/* ------------------------------------------------------------------ LUOGHI */
export const categorie = ["Storia", "Mare", "Architettura", "Spiritualità", "Natura"] as const;
export type Categoria = (typeof categorie)[number];

export type Luogo = {
  slug: string;
  name: string;
  cat: Categoria;
  image: PicName;
  borgo: string;
  lat: number; // posizioni indicative, da verificare
  lng: number;
  article?: string; // chiave in lib/articoli.json
  note?: string; // riquadro "testo in arrivo"
  tour?: string; // Virtual Tour a 360° del sito attuale (realsee.ai)
};

// I primi 5 sono quelli scelti da Ilaria per la Home
export const luoghi: Luogo[] = [
  { slug: "parco-archeologico-velia", name: "Parco Archeologico di Elea Velia", cat: "Storia", image: "velia-parco", borgo: "ascea-marina", lat: 40.1606, lng: 15.1545 },
  { slug: "la-scogliera", name: "La Scogliera", cat: "Mare", image: "scogliera", borgo: "ascea-marina", lat: 40.129, lng: 15.1905 },
  { slug: "palazzo-ricci", name: "Palazzo Ricci", cat: "Architettura", image: "palazzo-ricci", borgo: "ascea-paese", lat: 40.1419, lng: 15.1866, article: "palazzo-ricci-ascea" },
  {
    slug: "santuario-madonna-del-carmine", name: "Santuario Madonna del Carmine", cat: "Spiritualità", image: "santuario-carmine", borgo: "catona", lat: 40.1555, lng: 15.216, article: "santuario",
    note: "Eventuale testo dedicato al Santuario. Intanto è riportato il paragrafo presente oggi nella pagina “Sentiero del Carmelo” del sito attuale.",
  },
  { slug: "sentiero-degli-innamorati", name: "Sentiero degli Innamorati", cat: "Natura", image: "sentiero-innamorati", borgo: "ascea-marina", lat: 40.1272, lng: 15.196, article: "sentiero-degli-innamorati-ascea", tour: "https://realsee.ai/ybkkPVWR" },
  // dal sito attuale (Itinerari)
  { slug: "sentiero-aurella", name: "Sentiero Aurella", cat: "Natura", image: "sentiero-aurella", borgo: "ascea-paese", lat: 40.1432, lng: 15.179, article: "sentiero-aurella-ascea" },
  { slug: "sentiero-del-carmelo", name: "Sentiero del Carmelo", cat: "Natura", image: "sentiero-carmelo", borgo: "catona", lat: 40.15, lng: 15.203, article: "sentiero-del-carmelo-ascea" },
  {
    slug: "museo-del-mare", name: "Museo del Mare – mUMANA", cat: "Storia", image: "museo-mare", borgo: "ascea-marina", lat: 40.1438, lng: 15.1712, article: "museo-del-mare",
    note: "Approfondimento sul museo: orari, sale, collezioni.",
  },
];

export const getBorgo = (slug: string) => borghi.find((b) => b.slug === slug);
export const getLuogo = (slug: string) => luoghi.find((l) => l.slug === slug);

/* ------------------------------------------------------------------ NEWS (link indicati da Ilaria) */
export type News = { type: "News" | "Video"; title?: string; source: string; image: PicName; url: string };
export const news: News[] = [
  {
    type: "Video", title: "Ad Ascea, nel Cilento, le tartarughe Tonino e Mattiele tornano in mare: il momento del rilascio",
    source: "Facebook", image: "news-tartarughe", url: "https://www.facebook.com/reel/1109105914862375",
  },
  {
    type: "News", title: "Nel Cilento due centenari festeggiati in pochi giorni", source: "ANSA", image: "news-ansa",
    url: "https://www.ansa.it/campania/notizie/2026/09/15/nel-cilento-due-centenari-festeggiati-in-pochi-giorni_d9ea7c49-4e5d-4ee9-96cf-909e3d9beae4.html",
  },
  {
    type: "News", title: "“La Rotta dei Focei” ponte nel Mediterraneo", source: "la Repubblica Napoli", image: "news-repubblica",
    url: "https://napoli.repubblica.it/commenti/2026/05/13/news/la_rotta_dei_foceiponte_nel_mediterraneo-425341943/",
  },
];

/* ------------------------------------------------------------------ DOVE SOGGIORNARE (sito attuale, Turismo rurale) */
export const soggiornare = {
  title: "Dove soggiornare",
  subtitle: "Le strutture rurali di Ascea",
  text: "Le strutture turistiche rurali di Ascea, offrono soggiorni indimenticabili all’insegna del relax e della scoperta.",
};
export const strutture: { name: string; image: PicName; url: string }[] = [
  { name: "Ascea Experience Rooms", image: "str-ascea-experience-rooms", url: "https://asceaturismo.com/ascea-experience-rooms/" },
  { name: "Barnìa", image: "str-barnia", url: "https://asceaturismo.com/agriturismo-barnia/" },
  { name: "Corte degli Ulivi", image: "str-corte-degli-ulivi", url: "https://asceaturismo.com/corte-degli-ulivi/" },
  { name: "La Fattoria del Cilento", image: "str-fattoria-del-cilento", url: "https://asceaturismo.com/la-fattoria-del-cilento/" },
  { name: "La Petrosa", image: "str-la-petrosa", url: "https://asceaturismo.com/la-petrosa/" },
  { name: "La Terra di Parmenide", image: "str-terra-di-parmenide", url: "https://asceaturismo.com/la-terra-di-parmenide/" },
  { name: "Relais da Clorinda", image: "str-relais-da-clorinda", url: "https://asceaturismo.com/relais-da-clorinda/" },
  { name: "Resort Santa Maria", image: "str-resort-santa-maria", url: "https://asceaturismo.com/resort-santa-maria/" },
  { name: "Tempa del Niglio", image: "str-tempa-del-niglio", url: "https://asceaturismo.com/tempa-del-niglio/" },
  { name: "Villa Santa Sofia", image: "str-villa-santa-sofia", url: "https://asceaturismo.com/villa-santa-sofia/" },
  { name: "Villa Serra D’Elci", image: "str-villa-serra-delci", url: "https://asceaturismo.com/villa-serra-delci/" },
];

/* ------------------------------------------------------------------ MAPPA */
export type Punto = { tipo: "borgo" | "luogo"; slug: string; name: string; sub: string; lat: number; lng: number; color: string; href: string };
export const punti: Punto[] = [
  ...borghi.map((b) => ({ tipo: "borgo" as const, slug: b.slug, name: b.name, sub: "Borgo", lat: b.lat, lng: b.lng, color: tones[b.tone].pin, href: `/borghi/${b.slug}/` })),
  ...luoghi.map((l) => ({ tipo: "luogo" as const, slug: l.slug, name: l.name, sub: l.cat, lat: l.lat, lng: l.lng, color: "#0B6585", href: `/luoghi/${l.slug}/` })),
];
