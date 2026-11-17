# Ascea Turismo 360 — prototipo redesign

Prototipo HTML navigabile del nuovo asceaturismo.com. **Struttura** e layout replicano pisciottaborgovivo.it. **Identità** (logo, colori, font DM Sans) è quella attuale di Ascea Turismo 360.
Per vederlo basta aprire `index.html` nel browser.

## Pagine
| Menu | File |
|---|---|
| Home | `index.html` |
| Borghi | `borghi.html` + 5 schede `borgo-*.html` (Ascea Paese, Ascea Marina, Mandia, Terradura, Catona) |
| Luoghi | `luoghi.html` (con filtri per categoria) + 8 schede `luogo-*.html` |
| Blog | `blog.html` (News ed eventi) |
| Il progetto | `il-progetto.html` |
| Mappa | `mappa.html` |
| Dove soggiornare (bottone header) | `dove-soggiornare.html` |
| Contatti (bottone header) | `contatti.html` |

## Da dove vengono i contenuti
- **Home**: il copy di Ilaria, dal Google Doc "HOME PAGE", è inserito alla lettera.
- Schede di **Palazzo Ricci, Sentiero degli Innamorati, Sentiero Aurella, Sentiero del Carmelo e Museo del Mare**: testi presi dal sito attuale (sezione Itinerari). Ho corretto solo due refusi: "trovaano" e "a nticipato".
- **Dove soggiornare** e **Contatti**: elenco strutture, indirizzo, email e telefono presi dal sito attuale.
- **Foto**: link di Ilaria (Parco di Velia, Scogliera), sito attuale, Pro Loco Ascea (frazioni).
- I riquadri tratteggiati arancioni **"Testo in arrivo"** segnano i testi ancora da scrivere.

## Punti aperti
1. Testi delle pagine interne (borghi, Velia, Scogliera, Santuario, Il progetto, Dove soggiornare): da Ilaria.
2. Titolo del reel Facebook nella sezione News.
3. Link Facebook e Instagram del footer.
4. Foto da brochure (Palazzo Ricci, Santuario) e due foto Drive non accessibili: `cilento_horizon_ascea_2.webp` e `7CCFEB48-….JPEG`.
5. Foto di Ascea Paese (`assets/img/ascea-paese.jpg`, dalla Pro Loco): verificare che ritragga davvero il capoluogo.
6. Posizioni sulla mappa **indicative** (soprattutto Scogliera, Santuario e sentieri) e strutture ricettive non ancora mappate: servono gli indirizzi.
7. Microcopy aggiunto da me, da far validare a Ilaria: "Tutte le news", "Leggi l’articolo completo", "Esterno", "Scopri di più", "I luoghi simbolo di …", "Gli altri borghi", "Altri luoghi da vivere", "Dove si trova".
8. Il sito attuale ha anche la versione inglese (WPML): da decidere se mantenerla.

## Note per lo sviluppo (Alessandro)
- I contenuti sono centralizzati in `_build/build.py`. Dopo una modifica si rigenerano le pagine con `python3 _build/build.py`.
- CSS in `assets/css/style.css`: tutti i colori sono variabili in `:root`. JS in `assets/js/main.js`: menu mobile, scorrimento hero, animazioni, filtri e mappe Leaflet.
- Mappa: per il prototipo uso le tile OpenStreetMap. In produzione serve un provider con chiave (Pisciotta usa MapTiler).
- Le immagini sono già ottimizzate a 1800 px (strutture e news a 1000 px).
