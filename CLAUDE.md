@AGENTS.md

# Sito Ascea Turismo 360 — redesign (asceaturismo.com)

Richiesta di Irene e Biagio (17/11/2026) a Francesco e Ilaria. Integra il `CLAUDE.md` generale di QCORE.
- **Struttura e layout:** come [pisciottaborgovivo.it](https://pisciottaborgovivo.it), anche questo un sito QCORE.
- **Identità:** logo, colori e font attuali di Ascea Turismo 360.
- **Copy:** Ilaria, nel Google Doc "HOME PAGE" (id `1-HuzQ7jn6cmpHKQqZ-TgLsVv87oixffnznbl0SzsrEA`). Al 17/11/2026 contiene solo la Home: le voci del menu indicate lì sono diventate le pagine del sito.

## Tecnologia
Stesse tecnologie del sito RLB e del sito di Francesco, richiesto da Francesco il 17/11/2026:
- Next.js 16 con export statico (`output: "export"` → `out/`, da caricare via FTP), React 19, TypeScript, ESLint.
- Tailwind 4: token del brand in `@theme` in `app/globals.css`.
- Lenis per lo scroll fluido.
- Font con `next/font`: Dosis (Google Fonts, variabile 200–800), lo stesso di Pisciotta, servito dal sito stesso.
- Niente GSAP. Le comparse sono in CSS legate allo scroll (`animation-timeline: view()`); se il browser non le supporta, il contenuto resta visibile.
- Fascia di foto dell'apertura: loop continuo verso sinistra come Pisciotta (`hero-loop`, 26 s, due copie in `.hero-group`); rallenta al passaggio del mouse (`components/HeroTrack.tsx`). Ferma con "riduci movimento".
- Menu mobile: si apre sotto l'header, così l'hamburger resta visibile e diventa una X.
- Mappa: MapLibre GL 5 (`components/MapView.tsx`), mappa vettoriale come Pisciotta. Stile OpenFreeMap "Positron" (gratuito, senza chiave) nella costante `MAP_STYLE`; Pisciotta usa MapTiler "dataviz-v4" con la sua chiave: con una chiave MapTiler di Ascea basta cambiare `MAP_STYLE`. Zoom con ctrl/⌘ + rotella (due dita su mobile), così la pagina continua a scorrere.

### Struttura
- **Pagine:**
  - `app/page.tsx` (Home), `app/borghi/`, `app/borghi/[slug]/`, `app/luoghi/` (filtri per categoria), `app/luoghi/[slug]/`;
  - `app/blog/`, `app/il-progetto/`, `app/mappa/`, `app/contatti/`.
  - **Dove soggiornare tolta per ora** (pagina e bottone nell'header, 18/11/2026): la pagina è nella cronologia Git (`app/dove-soggiornare/page.tsx`); dati (`soggiornare`, `strutture` in `lib/site.ts`) e stili (`.grid-strutture`, `.card-str`) restano pronti per rimetterla.
- **Dati e testi:**
  - `lib/site.ts`: **tutti** i testi e i dati (home, borghi, luoghi, news, strutture, punti della mappa). Il copy di Ilaria va usato così com'è;
  - `lib/articoli.json` (tramite `lib/articoli.ts`): testi delle schede luoghi presi dal sito attuale (Itinerari).
- **Componenti** (`components/`): `Header`, `Footer`, `Cards` (card borgo/luogo/news, `PageHero`, `Placeholder`, `SectionHead`), `HeroTrack`, `MapView`, `LuoghiGrid`, `Pic`, `SmoothScroll`, `Icons`.
- **Foto:** come RLB.
  - Gli originali stanno in `media/` (non pubblicati).
  - `npm run images` genera in `public/img/opt/` AVIF + WebP + JPG e `lib/images.json`; nel sito si usano con `Pic`.
  - Per cambiare o aggiungere una foto: metterla in `media/`, lanciare `npm run images`, poi la build.
- **Loghi** (dal sito attuale): `public/brand/`.
- `prototipo/`: prima versione in HTML statico, solo come riferimento. È esclusa da lint e build e contiene `LEGGIMI.md` con le fonti.
- **Riquadri "Testo in arrivo":** il componente `Placeholder` (tratteggio arancione) segna i testi che deve ancora mandare Ilaria.

## Brand
- **Colori del logo:** azzurro `#21BAE3`, arancio `#EA5E3B`, giallo `#FAB836`, verde `#26B2A6`, viola `#7C4F9F`.
- **Primario per titoli, bottoni e footer:** `#0B6585`, l'azzurro scurito per avere contrasto. Inchiostro `#1B1D1F`, fondo sabbia `#F6F2EC`.
- **Ogni borgo ha un colore del logo:** Ascea Paese arancio, Ascea Marina azzurro, Mandia verde, Terradura viola, Catona giallo (in `lib/site.ts`, `tones`).

## Comandi
- `npm run dev` → http://localhost:3002, con aggiornamento a ogni modifica.
- Dopo ogni modifica: `npm run lint`, `npm run build`, poi `npm run preview` → http://localhost:4175 (build come in produzione). Porte occupate dagli altri siti: 4173 sito personale, 4174 RLB.
- `?static` in fondo all'indirizzo: pagina senza animazioni, per gli screenshot di controllo.
- **Avviso di sicurezza (17/11/2026):** `next build` segnala una vulnerabilità di Next 16.4.3 (la stessa versione di RLB) e chiude con un errore. L'export in `out/` però è completo. L'aggiornamento (`next upgrade --agent=security`) è da far decidere a Francesco.

## Aperti
- Testi delle pagine interne (borghi, Velia, Scogliera, Santuario, Il progetto, Dove soggiornare): da Ilaria.
- Titolo del reel Facebook (News); link Facebook e Instagram del footer.
- Foto della brochure (Palazzo Ricci, Santuario) e due foto Drive non accessibili (`cilento_horizon_ascea_2.webp`, `7CCFEB48….JPEG`).
- Foto di Ascea Paese, presa dalla Pro Loco: verificare che ritragga il capoluogo.
- Posizioni della mappa indicative.
- Microcopy aggiunto da validare con Ilaria: "Tutte le news", "Leggi l’articolo completo", "Esterno", "Scopri di più", "I luoghi simbolo di …", "Gli altri borghi", "Altri luoghi da vivere", "Dove si trova".
- Testi senza riferimenti a strutture ricettive e prenotazioni (richiesta di Ilaria, 18/11/2026): tolti dall'intro della Home e dal testo della mappa; le modifiche alle frasi sono da far validare a Ilaria.
- Versione inglese (il sito attuale ha WPML): da decidere.
- Virtual Tour (campo `tour` dei luoghi, in fondo alla scheda): sul sito attuale c'è solo quello del Sentiero degli Innamorati (`https://realsee.ai/ybkkPVWR`). Al 18/11/2026 realsee.ai risponde "VR non disponibile – contattare il proprietario" anche aperto direttamente: va riattivato da chi gestisce l'account Realsee. Titolo "Virtual Tour" da validare con Ilaria.

## Stato al 17/11/2026 (fine giornata)
- Sito Next.js completo con tutte le pagine; lint ok, export in `out/` completo, verificato in Chrome (desktop e telefono).
- Lavoro salvato in Git e su GitHub: repository **privato** https://github.com/fedullos13/ascea-turismo-360 (branch `main`, dal 18/11/2026). Dopo ogni modifica: commit e `git push`.
- In sospeso: aggiornamento di sicurezza di Next.js (vedi Comandi), da far decidere a Francesco.
- Per ripartire: `npm run dev` (3002) oppure `npm run build` + `npm run preview` (4175).
