#!/usr/bin/env python3
"""
Genera le pagine HTML del prototipo Ascea Turismo 360.
Uso:  python3 _build/build.py      (dalla cartella SITO_PROTOTIPO)

I contenuti stanno tutti qui sotto (dizionari BORGHI, LUOGHI, NEWS, STRUTTURE)
e nel file articoli.json (testi presi dal sito attuale asceaturismo.com).
Il copy della Home è quello di Ilaria (Google Doc "HOME PAGE"), inserito alla lettera.
"""
import json, os, html as H

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = json.load(open(os.path.join(ROOT, '_build', 'articoli.json'), encoding='utf-8'))

C = {  # colori del logo (versione leggibile su bianco per i titoli)
    'arancio': '#C9431F', 'azzurro': '#0B8DB5', 'verde': '#1A8379',
    'viola': '#7C4F9F', 'giallo': '#B87A06', 'primario': '#0B6585',
}
PIN = {'arancio': '#EA5E3B', 'azzurro': '#21BAE3', 'verde': '#26B2A6', 'viola': '#7C4F9F', 'giallo': '#F2A81D'}

NAV = [('index.html', 'Home'), ('borghi.html', 'Borghi'), ('luoghi.html', 'Luoghi'),
       ('blog.html', 'Blog'), ('il-progetto.html', 'Il progetto'), ('mappa.html', 'Mappa')]

# ------------------------------------------------------------------ BORGHI
# descrizioni: copy di Ilaria (Home > I borghi), alla lettera
BORGHI = [
    dict(id='ascea-paese', nome='Ascea Paese', colore='arancio', img='ascea-paese',
         desc='L’affascinante centro storico dove perdersi tra vicoli suggestivi, antiche tradizioni e scorci storici unici.',
         lat=40.1416, lng=15.1858, luoghi=['palazzo-ricci', 'sentiero-aurella']),
    dict(id='ascea-marina', nome='Ascea Marina', colore='azzurro', img='ascea-marina',
         desc='Dove convivono la lunga spiaggia di sabbia dorata e la storia millenaria del Parco Archeologico di Velia.',
         lat=40.1454, lng=15.1679, luoghi=['parco-archeologico-velia', 'la-scogliera', 'sentiero-degli-innamorati', 'museo-del-mare']),
    dict(id='mandia', nome='Mandia', colore='verde', img='mandia',
         desc='La frazione più interna incastonata tra uliveti secolari e rigogliosi castagneti.',
         lat=40.1538, lng=15.2499, luoghi=[]),
    dict(id='terradura', nome='Terradura', colore='viola', img='terradura',
         desc='Un’oasi rurale ricca di storia e paesaggi incontaminati con le sue radici italo-greche.',
         lat=40.1566, lng=15.2179, luoghi=[]),
    dict(id='catona', nome='Catona', colore='giallo', img='catona',
         desc="Un'oasi di pace e spiritualità, custode del Santuario della Madonna del Carmine.",
         lat=40.1497, lng=15.2361, luoghi=['santuario-madonna-del-carmine', 'sentiero-del-carmelo']),
]
B = {b['id']: b for b in BORGHI}

# ------------------------------------------------------------------ LUOGHI
# i primi 5 sono quelli indicati da Ilaria per la Home (categoria: nome)
LUOGHI = [
    dict(id='parco-archeologico-velia', nome='Parco Archeologico di Elea Velia', cat='Storia', img='velia-parco',
         borgo='ascea-marina', lat=40.1606, lng=15.1545, art=None),
    dict(id='la-scogliera', nome='La Scogliera', cat='Mare', img='scogliera',
         borgo='ascea-marina', lat=40.1290, lng=15.1905, art=None),
    dict(id='palazzo-ricci', nome='Palazzo Ricci', cat='Architettura', img='palazzo-ricci',
         borgo='ascea-paese', lat=40.1419, lng=15.1866, art='palazzo-ricci-ascea'),
    dict(id='santuario-madonna-del-carmine', nome='Santuario Madonna del Carmine', cat='Spiritualità', img='santuario-carmine',
         borgo='catona', lat=40.1555, lng=15.2160, art='santuario'),
    dict(id='sentiero-degli-innamorati', nome='Sentiero degli Innamorati', cat='Natura', img='sentiero-innamorati',
         borgo='ascea-marina', lat=40.1272, lng=15.1960, art='sentiero-degli-innamorati-ascea'),
    # dal sito attuale (sezione Itinerari)
    dict(id='sentiero-aurella', nome='Sentiero Aurella', cat='Natura', img='sentiero-aurella',
         borgo='ascea-paese', lat=40.1432, lng=15.1790, art='sentiero-aurella-ascea'),
    dict(id='sentiero-del-carmelo', nome='Sentiero del Carmelo', cat='Natura', img='sentiero-carmelo',
         borgo='catona', lat=40.1500, lng=15.2030, art='sentiero-del-carmelo-ascea'),
    dict(id='museo-del-mare', nome='Museo del Mare – mUMANA', cat='Storia', img='museo-mare',
         borgo='ascea-marina', lat=40.1438, lng=15.1712, art='museo-del-mare'),
]
L = {l['id']: l for l in LUOGHI}
CATEGORIE = ['Storia', 'Mare', 'Architettura', 'Spiritualità', 'Natura']

# ------------------------------------------------------------------ NEWS (link indicati da Ilaria)
NEWS = [
    dict(tipo='Video', titolo=None, fonte='Facebook', img='tramonto',
         url='https://www.facebook.com/reel/1109105914862375'),
    dict(tipo='News', titolo='Nel Cilento due centenari festeggiati in pochi giorni', fonte='ANSA', img='news-ansa',
         url='https://www.ansa.it/campania/notizie/2026/09/15/nel-cilento-due-centenari-festeggiati-in-pochi-giorni_d9ea7c49-4e5d-4ee9-96cf-909e3d9beae4.html'),
    dict(tipo='News', titolo='“La Rotta dei Focei” ponte nel Mediterraneo', fonte='la Repubblica Napoli', img='news-repubblica',
         url='https://napoli.repubblica.it/commenti/2026/05/13/news/la_rotta_dei_foceiponte_nel_mediterraneo-425341943/'),
]

# ------------------------------------------------------------------ STRUTTURE (dal sito attuale, pagina Turismo rurale)
STRUTTURE = [
    ('Ascea Experience Rooms', 'str-ascea-experience-rooms', 'https://asceaturismo.com/ascea-experience-rooms/'),
    ('Barnìa', 'str-barnia', 'https://asceaturismo.com/agriturismo-barnia/'),
    ('Corte degli Ulivi', 'str-corte-degli-ulivi', 'https://asceaturismo.com/corte-degli-ulivi/'),
    ('La Fattoria del Cilento', 'str-fattoria-del-cilento', 'https://asceaturismo.com/la-fattoria-del-cilento/'),
    ('La Petrosa', 'str-la-petrosa', 'https://asceaturismo.com/la-petrosa/'),
    ('La Terra di Parmenide', 'str-terra-di-parmenide', 'https://asceaturismo.com/la-terra-di-parmenide/'),
    ('Relais da Clorinda', 'str-relais-da-clorinda', 'https://asceaturismo.com/relais-da-clorinda/'),
    ('Resort Santa Maria', 'str-resort-santa-maria', 'https://asceaturismo.com/resort-santa-maria/'),
    ('Tempa del Niglio', 'str-tempa-del-niglio', 'https://asceaturismo.com/tempa-del-niglio/'),
    ('Villa Santa Sofia', 'str-villa-santa-sofia', 'https://asceaturismo.com/villa-santa-sofia/'),
    ('Villa Serra D’Elci', 'str-villa-serra-delci', 'https://asceaturismo.com/villa-serra-delci/'),
]

# ------------------------------------------------------------------ helpers
def esc(s): return H.escape(s, quote=True)
def img(name, alt, cls='', eager=False, sizes=None):
    c = f' class="{cls}"' if cls else ''
    return f'<img src="assets/img/{name}.jpg" alt="{esc(alt)}"{c} loading="{"eager" if eager else "lazy"}" decoding="async">'

def ph(chi, cosa, inline=False):
    return f'<div class="placeholder{" placeholder--inline" if inline else ""}"><strong>Testo in arrivo · {chi}</strong>{cosa}</div>'

ICON_EXT = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>'
ICON_FB = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z"/></svg>'
ICON_IG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>'

def punti_js():
    pts = []
    for b in BORGHI:
        pts.append(dict(tipo='borgo', id=b['id'], nome=b['nome'], sotto='Borgo', lat=b['lat'], lng=b['lng'],
                        colore=PIN[b['colore']], url=f"borgo-{b['id']}.html"))
    for l in LUOGHI:
        pts.append(dict(tipo='luogo', id=l['id'], nome=l['nome'], sotto=l['cat'], lat=l['lat'], lng=l['lng'],
                        colore='#0B6585', url=f"luogo-{l['id']}.html"))
    return '<script>window.ASCEA_PUNTI=' + json.dumps(pts, ensure_ascii=False) + ';</script>'

def page(fname, title, desc, body, current=None, map_=False):
    nav = ''.join(f'<li><a href="{h}"{" aria-current=%spage%s" % (chr(34), chr(34)) if h == current else ""}>{t}</a></li>' for h, t in NAV)
    mob = ''.join(f'<li><a href="{h}">{t}</a></li>' for h, t in NAV)
    leaflet_css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">' if map_ else ''
    leaflet_js = ('<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>' + punti_js()) if map_ else ''
    footer_nav = ''.join(f'<li><a href="{h}">{t}</a></li>' for h, t in NAV)
    doc = f'''<!doctype html>
<html lang="it" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex">
<link rel="icon" href="assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet">
{leaflet_css}
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<a class="skip" href="#contenuto">Vai al contenuto</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Ascea Turismo 360 – Home"><img src="assets/logo-ascea-turismo360.png" alt="Ascea Turismo 360" width="725" height="250"></a>
    <nav class="nav-main" aria-label="Menu principale"><ul>{nav}</ul></nav>
    <div class="header-cta">
      <a class="btn btn--arancio-pieno" href="dove-soggiornare.html">Dove soggiornare</a>
      <a class="btn" href="contatti.html">Contatti</a>
    </div>
    <button class="burger" aria-label="Apri il menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <ul>{mob}</ul>
  <div class="header-cta">
    <a class="btn btn--arancio-pieno" href="dove-soggiornare.html">Dove soggiornare</a>
    <a class="btn" href="contatti.html">Contatti</a>
  </div>
</div>

<main id="contenuto">
{body}
</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <img class="footer-logo" src="assets/logo-ascea-turismo360-bianco.png" alt="Ascea Turismo 360" width="725" height="250" loading="lazy">
        <p class="footer-claim">Ascea Turismo 360 è un progetto dedicato alla scoperta di Ascea.</p>
      </div>
      <div>
        <h2>Navigazione</h2>
        <ul>{footer_nav}</ul>
      </div>
      <div>
        <h2>Informazioni</h2>
        <ul>
          <li><a href="https://asceaturismo.com/cookie-policy/">Cookie policy</a></li>
          <li><a href="https://asceaturismo.com/privacy-policy/">Dichiarazione sulla privacy</a></li>
        </ul>
      </div>
      <div>
        <h2>Seguici</h2>
        <div class="social">
          <a href="#" aria-label="Facebook (link da inserire)">{ICON_FB}</a>
          <a href="#" aria-label="Instagram (link da inserire)">{ICON_IG}</a>
        </div>
        <div class="footer-enti">
          <div class="loghi">
            <img src="assets/logo-comune.png" alt="Comune di Ascea" loading="lazy">
            <img src="assets/logo-ministero.jpg" alt="Ministero dell’Interno" loading="lazy">
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Ascea Turismo 360. Tutti i diritti riservati.<span>|</span>by Qcore Agency</div>
  </div>
</footer>
<div class="proto-note" role="note">Prototipo QCORE · bozza per revisione <button aria-label="Chiudi nota">×</button></div>
{leaflet_js}
<script src="assets/js/main.js"></script>
</body>
</html>
'''
    with open(os.path.join(ROOT, fname), 'w', encoding='utf-8') as f:
        f.write(doc)
    print('ok', fname)

def card_borgo(b, i=0, big=False):
    return f'''<a class="card-borgo reveal reveal-d{i % 5}" href="borgo-{b['id']}.html" style="--c:{C[b['colore']]}">
  <div class="card-borgo__img">{img(b['img'], b['nome'])}</div>
  <h3>{b['nome']}</h3>
  <p>{b['desc']}</p>
</a>'''

def card_luogo(l, i=0):
    return f'''<a class="card-luogo reveal reveal-d{i % 3}" href="luogo-{l['id']}.html" data-cat="{esc(l['cat'])}">
  <div class="card-luogo__img">{img(l['img'], l['nome'])}</div>
  <div class="card-luogo__body"><span class="tag">{l['cat']}</span><h3>{l['nome']}</h3></div>
</a>'''

def card_news(n, i=0):
    titolo = n['titolo'] or '[Titolo del reel da definire]'
    pill = 'pill pill--video' if n['tipo'] == 'Video' else 'pill'
    return f'''<a class="card-news reveal reveal-d{i % 3}" href="{n['url']}" target="_blank" rel="noopener">
  <div class="card-news__img">{img(n['img'], titolo if n['titolo'] else 'Ascea')}<span class="badge-ext">{ICON_EXT} Esterno</span></div>
  <div class="card-news__body">
    <span class="{pill}">{n['tipo']}</span>
    <h3>{esc(titolo)}</h3>
    <span class="fonte">{n['fonte']}</span>
    <span class="read">Leggi l’articolo completo {ICON_EXT}</span>
  </div>
</a>'''

def page_hero(title, sub, im, tint=None, crumb=None, eyebrow=None):
    style = f' style="--c:{tint}"' if tint else ''
    cls = 'page-hero page-hero--tint' if tint else 'page-hero'
    cr = f'<nav class="breadcrumb" aria-label="Percorso">{crumb}</nav>' if crumb else ''
    eb = f'<span class="eyebrow">{eyebrow}</span>' if eyebrow else ''
    sb = f'<p>{sub}</p>' if sub else ''
    return f'''<section class="{cls}"{style}>
  {img(im, '', eager=True)}
  <div class="wrap">{cr}{eb}<h1>{title}</h1>{sb}</div>
</section>'''

def article_html(key, title=None):
    out = []
    for i, (t, x) in enumerate(ART[key]):
        if i == 0 and title and t == 'h2' and x.strip().lower() == title.lower():
            continue
        out.append(f'<{t}>{x}</{t}>')
    return '\n'.join(out)

def excerpt(key, n=2):
    ps = [x for t, x in ART[key] if t == 'p'][:n]
    return ''.join(f'<p>{p}</p>' for p in ps)

# =================================================================== HOME
def build_home():
    hero_cols = [
        ('hero-col--hide-sm', [('telegrafo', 'r-tall')]),
        ('', [('scogliera', 'r-sq'), ('sentiero-aurella', 'r-wide')]),
        ('hero-col--xl', [('velia-parco', 'r-big')]),
        ('', [('palazzo-ricci', 'r-sq'), ('catona', 'r-wide')]),
        ('', [('sentiero-innamorati', 'r-tall')]),
        ('', [('santuario-carmine', 'r-tall')]),
        ('hero-col--hide-sm', [('ascea-marina', 'r-sq'), ('mandia', 'r-wide')]),
    ]
    cols = ''
    for cls, ims in hero_cols:
        figs = ''.join(f'<figure class="{r}">{img(n, "", eager=True)}</figure>' for n, r in ims)
        cols += f'<div class="hero-col {cls}">{figs}</div>'

    borghi = ''.join(card_borgo(b, i) for i, b in enumerate(BORGHI))
    luoghi = ''.join(card_luogo(l, i) for i, l in enumerate(LUOGHI[:5]))
    news = ''.join(card_news(n, i) for i, n in enumerate(NEWS))

    body = f'''
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-track" aria-hidden="true">{cols}</div>
  <div class="wrap hero-copy">
    <h1 id="hero-title" class="h-display">Ascea Turismo <b>360</b></h1>
    <p class="lead">La guida ufficiale di Ascea</p>
    <div class="btn-row">
      <a class="btn btn--pieno" href="il-progetto.html">Scopri il progetto</a>
      <a class="btn btn--arancio" href="borghi.html">Scopri Ascea</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <h2 class="h-section">Ascea Turismo 360:<br>una finestra sul territorio</h2>
      <div class="prose">
        <p><strong>Ascea Turismo 360 </strong>è il<strong> portale </strong>dedicato alla<strong> scoperta di Ascea. </strong>Una finestra sul territorio pensata per accompagnare visitatori e viaggiatori alla scoperta di tutte le sue bellezze, dai luoghi più iconici ai meno conosciuti, dalle esperienze da vivere ai posti in cui soggiornare.</p>
        <p>La <strong>lunghissima spiaggia di Ascea Marina,</strong> il fascino del<strong> Parco Archeologico di Velia</strong>, i percorsi della<strong> rete sentieristica</strong>, <strong>Palazzo De Dominicis-Ricci</strong> ad <strong>Ascea Capoluogo</strong>, il <strong>Santuario della Madonna del Carmine</strong> a <strong>Catona</strong> sono solo alcuni dei luoghi di interesse storico, culturale e naturalistico presenti nel portale.</p>
        <p>Uno strumento che attraverso approfondimenti e informazioni utili, vuole essere il punto di riferimento per chi desidera conoscere Ascea e anche prenotare la struttura ricettiva presso la quale soggiornare.<br>Esplora, visita, innamorati di Ascea.</p>
      </div>
      <a class="btn" href="il-progetto.html">Scopri di più</a>
    </div>
    <div class="split__media reveal reveal-d2">{img('panoramica-velia', 'Panorama di Ascea dagli scavi di Velia')}</div>
  </div>
</section>

<section class="section section--sabbia">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 class="h-section">I borghi</h2>
      <p class="lead">Il fascino di Ascea: borghi da vivere, storie da raccontare</p>
    </div>
    <div class="grid-borghi">{borghi}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 class="h-section">I luoghi da vivere</h2>
      <p class="lead">Un itinerario suggestivo tra le acque cristalline di Ascea Marina, l'eredità millenaria del Parco Archeologico di Elea-Velia e i sentieri immersi nella macchia mediterranea, dove natura, storia e cultura si incontrano.</p>
    </div>
    <div class="grid-luoghi grid-luoghi--home">{luoghi}</div>
    <div class="center mt-cta"><a class="btn" href="luoghi.html">Scopri tutti i luoghi</a></div>
  </div>
</section>

<section class="section section--sabbia">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 class="h-section">News ed eventi</h2>
      <p class="lead">Le notizie che raccontano Ascea, le sue frazioni e località, gli eventi e le esperienze che si possono vivere sul territorio.</p>
    </div>
    <div class="grid-news">{news}</div>
    <div class="center mt-cta"><a class="btn" href="blog.html">Tutte le news</a></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="map-box reveal">
      <div>
        <h2 class="h-section">Esplora la mappa</h2>
        <p class="lead">Scopri i luoghi da vivere, i punti di interesse e dove soggiornare ad Ascea.</p>
        <a class="btn btn--pieno" href="mappa.html">Apri la mappa completa</a>
      </div>
      <div class="map" data-interactive="true" aria-label="Mappa di Ascea con borghi e luoghi"></div>
    </div>
  </div>
</section>'''
    page('index.html', 'Ascea Turismo 360 – La guida ufficiale di Ascea',
         'Ascea Turismo 360 è il portale dedicato alla scoperta di Ascea: borghi, luoghi da vivere, news ed eventi, mappa e dove soggiornare.',
         body, 'index.html', map_=True)

# =================================================================== BORGHI
def build_borghi():
    cards = ''.join(card_borgo(b, i) for i, b in enumerate(BORGHI))
    body = page_hero('I borghi', 'Il fascino di Ascea: borghi da vivere, storie da raccontare', 'panoramica-golfo') + f'''
<section class="section">
  <div class="wrap"><div class="grid-borghi-big">{cards}</div></div>
</section>'''
    page('borghi.html', 'I borghi – Ascea Turismo 360', 'Ascea Paese, Ascea Marina, Mandia, Terradura e Catona: i borghi di Ascea.', body, 'borghi.html')

    for b in BORGHI:
        col = C[b['colore']]
        luoghi = [L[x] for x in b['luoghi']]
        rows = ''
        for i, l in enumerate(luoghi):
            ex = excerpt(l['art']) if l['art'] else ph('Ilaria', f'Breve introduzione a {l["nome"]}.', inline=True)
            rows += f'''<div class="split{' split--rev' if i % 2 else ''} row-luogo" style="--c:{col}">
  <div class="reveal"><span class="tag">{l['cat']}</span><h3>{l['nome']}</h3><div class="prose">{ex}</div>
  <a class="btn btn--sm" href="luogo-{l['id']}.html">Scopri di più</a></div>
  <div class="split__media reveal reveal-d2">{img(l['img'], l['nome'])}</div>
</div>'''
        luoghi_sec = ''
        if luoghi:
            luoghi_sec = f'''<section class="band" style="--c:{col}"><div class="wrap">
  <h2>I luoghi simbolo di {b['nome']}</h2>
</div></section>
<section class="section"><div class="wrap rows">{rows}</div></section>'''
        altri = ''.join(card_borgo(x, i) for i, x in enumerate([x for x in BORGHI if x['id'] != b['id']]))
        body = page_hero(b['nome'], b['desc'], b['img'], tint=col,
                         crumb='<a href="index.html">Home</a> / <a href="borghi.html">Borghi</a>') + f'''
<section class="section">
  <div class="wrap wrap--narrow article">
    {ph('Ilaria', f'Testo di approfondimento su {b["nome"]}: storia, cosa vedere, tradizioni ed eventi (come nelle pagine borgo di Pisciotta Borgo Vivo).')}
  </div>
</section>
{luoghi_sec}
<section class="section section--sabbia">
  <div class="wrap">
    <div class="section-head reveal"><h2 class="h-section">Gli altri borghi</h2></div>
    <div class="grid-borghi grid-borghi--4">{altri}</div>
  </div>
</section>'''
        page(f"borgo-{b['id']}.html", f"{b['nome']} – Ascea Turismo 360", b['desc'], body, 'borghi.html')

# =================================================================== LUOGHI
def build_luoghi():
    chips = '<button class="chip" data-filter="tutti" aria-pressed="true">Tutti</button>' + ''.join(
        f'<button class="chip" data-filter="{c}" aria-pressed="false">{c}</button>' for c in CATEGORIE)
    cards = ''.join(card_luogo(l, i) for i, l in enumerate(LUOGHI))
    body = page_hero('I luoghi da vivere',
                     "Un itinerario suggestivo tra le acque cristalline di Ascea Marina, l'eredità millenaria del Parco Archeologico di Elea-Velia e i sentieri immersi nella macchia mediterranea, dove natura, storia e cultura si incontrano.",
                     'panorama-costa') + f'''
<section class="section">
  <div class="wrap">
    <div class="filtri" role="group" aria-label="Filtra per categoria" data-filter-group="#lista-luoghi">{chips}</div>
    <div class="grid-luoghi" id="lista-luoghi">{cards}</div>
  </div>
</section>'''
    page('luoghi.html', 'I luoghi da vivere – Ascea Turismo 360', 'Storia, mare, architettura, spiritualità e natura: i luoghi da vivere ad Ascea.', body, 'luoghi.html')

    for l in LUOGHI:
        b = B[l['borgo']]
        col = C[b['colore']]
        if l['art']:
            art = article_html(l['art'], l['nome'])
            if l['id'] == 'santuario-madonna-del-carmine':
                art = ph('Ilaria', 'Eventuale testo dedicato al Santuario. Intanto è riportato il paragrafo presente oggi nella pagina “Sentiero del Carmelo” del sito attuale.', inline=True) + '<br>' + art
            if l['id'] == 'museo-del-mare':
                art += '<br>' + ph('Ilaria', 'Approfondimento sul museo: orari, sale, collezioni.', inline=True)
        else:
            art = ph('Ilaria', f'Testo di approfondimento su {l["nome"]}.')
        altri = [x for x in LUOGHI if x['id'] != l['id']][:3]
        body = page_hero(l['nome'], None, l['img'], tint=col, eyebrow=f"{l['cat']} · {b['nome']}",
                         crumb='<a href="index.html">Home</a> / <a href="luoghi.html">Luoghi</a>') + f'''
<section class="section">
  <div class="wrap wrap--narrow article">
    {art}
  </div>
</section>
<section class="section section--sabbia" style="padding-block:clamp(3rem,6vw,4.5rem)">
  <div class="wrap wrap--narrow">
    <h2 class="h-section" style="font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:1.25rem">Dove si trova</h2>
    <div class="map map--small" data-only="luogo:{l['id']}" aria-label="Posizione di {esc(l['nome'])}"></div>
    <p style="font-size:.85rem;margin-top:.6rem">Posizione indicativa, da verificare.</p>
  </div>
</section>
<section class="section">
  <div class="wrap">
    <div class="section-head reveal"><h2 class="h-section">Altri luoghi da vivere</h2></div>
    <div class="grid-luoghi">{''.join(card_luogo(x, i) for i, x in enumerate(altri))}</div>
  </div>
</section>'''
        page(f"luogo-{l['id']}.html", f"{l['nome']} – Ascea Turismo 360", f"{l['nome']}, {b['nome']}: {l['cat'].lower()} ad Ascea.", body, 'luoghi.html', map_=True)

# =================================================================== BLOG
def build_blog():
    news = ''.join(card_news(n, i) for i, n in enumerate(NEWS))
    body = f'''
<section class="section section--sabbia" style="padding-top:clamp(3rem,6vw,4.5rem)">
  <div class="wrap">
    <div class="section-head">
      <h1 class="h-section">News ed eventi</h1>
      <p class="lead">Le notizie che raccontano Ascea, le sue frazioni e località, gli eventi e le esperienze che si possono vivere sul territorio.</p>
    </div>
    <div class="grid-news">{news}</div>
  </div>
</section>'''
    page('blog.html', 'News ed eventi – Ascea Turismo 360', 'Le notizie che raccontano Ascea, le sue frazioni e località, gli eventi e le esperienze sul territorio.', body, 'blog.html')

# =================================================================== IL PROGETTO
def build_progetto():
    body = page_hero('Il progetto', 'La guida ufficiale di Ascea', 'panoramica-velia') + f'''
<section class="section">
  <div class="wrap wrap--narrow">
    <div class="box-progetto reveal">
      <h2>Ascea Turismo 360: una finestra sul territorio</h2>
      <div class="prose">
        <p><strong>Ascea Turismo 360 </strong>è il<strong> portale </strong>dedicato alla<strong> scoperta di Ascea. </strong>Una finestra sul territorio pensata per accompagnare visitatori e viaggiatori alla scoperta di tutte le sue bellezze, dai luoghi più iconici ai meno conosciuti, dalle esperienze da vivere ai posti in cui soggiornare.</p>
        <p>La <strong>lunghissima spiaggia di Ascea Marina,</strong> il fascino del<strong> Parco Archeologico di Velia</strong>, i percorsi della<strong> rete sentieristica</strong>, <strong>Palazzo De Dominicis-Ricci</strong> ad <strong>Ascea Capoluogo</strong>, il <strong>Santuario della Madonna del Carmine</strong> a <strong>Catona</strong> sono solo alcuni dei luoghi di interesse storico, culturale e naturalistico presenti nel portale.</p>
        <p>Uno strumento che attraverso approfondimenti e informazioni utili, vuole essere il punto di riferimento per chi desidera conoscere Ascea e anche prenotare la struttura ricettiva presso la quale soggiornare.<br>Esplora, visita, innamorati di Ascea.</p>
      </div>
    </div>
    <div class="reveal" style="margin-top:2.5rem">{ph('Ilaria', 'Eventuali sezioni aggiuntive sul progetto (obiettivi, finanziamento, partner), come nella pagina “Il progetto” di Pisciotta Borgo Vivo.')}</div>
    <p class="center" style="margin-top:2.5rem">Ascea Turismo 360 è un progetto finanziato dal Ministero dell’interno e gestito dal Comune di Ascea.</p>
    <div class="loghi-ente">
      <img src="assets/logo-comune.png" alt="Comune di Ascea" loading="lazy">
      <img src="assets/logo-ministero.jpg" alt="Ministero dell’Interno" loading="lazy">
    </div>
  </div>
</section>'''
    page('il-progetto.html', 'Il progetto – Ascea Turismo 360', 'Ascea Turismo 360: una finestra sul territorio.', body, 'il-progetto.html')

# =================================================================== MAPPA
def build_mappa():
    legend = ''.join(f'<span style="--c:{PIN[b["colore"]]}"><i></i>{b["nome"]}</span>' for b in BORGHI) + '<span style="--c:#0B6585"><i></i>Luoghi da vivere</span>'
    body = f'''
<section class="section" style="padding-top:clamp(3rem,6vw,4.5rem)">
  <div class="wrap">
    <div class="section-head">
      <h1 class="h-section">Esplora la mappa</h1>
      <p class="lead">Scopri i luoghi da vivere, i punti di interesse e dove soggiornare ad Ascea.</p>
    </div>
    <div class="filtri" role="group" aria-label="Mostra sulla mappa" data-map-filter="#mappa-completa">
      <button class="chip" data-filter="tutti" aria-pressed="true">Tutto</button>
      <button class="chip" data-filter="borgo" aria-pressed="false">Borghi</button>
      <button class="chip" data-filter="luogo" aria-pressed="false">Luoghi</button>
    </div>
    <div class="map map--full" id="mappa-completa" aria-label="Mappa completa di Ascea"></div>
    <div class="map-legend">{legend}</div>
    <div style="margin-top:2rem">{ph('Francesco/Ilaria', 'Strutture ricettive sulla mappa: servono gli indirizzi delle strutture per posizionarle. Le posizioni dei luoghi sono indicative e vanno verificate.', inline=True)}</div>
  </div>
</section>'''
    page('mappa.html', 'Mappa – Ascea Turismo 360', 'La mappa di Ascea: borghi, luoghi da vivere e punti di interesse.', body, 'mappa.html', map_=True)

# =================================================================== DOVE SOGGIORNARE
def build_soggiornare():
    cards = ''.join(f'''<a class="card-str reveal reveal-d{i % 3}" href="{u}">
  <div class="card-str__img">{img(im, n)}</div>
  <div class="card-str__body"><h3>{n}</h3><span class="read">Scopri di più →</span></div>
</a>''' for i, (n, im, u) in enumerate(STRUTTURE))
    body = page_hero('Dove soggiornare', None, 'panorama-costa') + f'''
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 class="h-section">Le strutture rurali di Ascea</h2>
      <p class="lead">Le strutture turistiche rurali di Ascea, offrono soggiorni indimenticabili all’insegna del relax e della scoperta.</p>
    </div>
    <div style="max-width:46rem;margin:0 auto 3rem">{ph('Ilaria', 'Introduzione alla sezione “Dove soggiornare”. Il testo qui sopra e l’elenco delle strutture sono presi dal sito attuale (pagina Turismo rurale); il link “Scopri di più” porta per ora alle schede del sito attuale.', inline=True)}</div>
    <div class="grid-strutture">{cards}</div>
  </div>
</section>'''
    page('dove-soggiornare.html', 'Dove soggiornare – Ascea Turismo 360', 'Le strutture ricettive di Ascea dove soggiornare.', body)

# =================================================================== CONTATTI
def build_contatti():
    pin = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>'
    mail = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
    tel = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>'
    body = f'''
<section class="section" style="padding-top:clamp(3rem,6vw,4.5rem)">
  <div class="wrap wrap--narrow">
    <div class="section-head"><h1 class="h-section">Contatti</h1></div>
    <div class="contact-grid">
      <div class="contact-card reveal"><span class="ico">{pin}</span><h3>Indirizzo</h3><p>Via XXIV Maggio, 84046 Ascea SA</p></div>
      <div class="contact-card reveal reveal-d1"><span class="ico">{mail}</span><h3>Email</h3><a href="mailto:info@asceaturismo.com">info@asceaturismo.com</a></div>
      <div class="contact-card reveal reveal-d2"><span class="ico">{tel}</span><h3>Telefono</h3><a href="tel:+390974977008">0974 977008</a></div>
    </div>
    <p class="center" style="margin-top:2rem;font-size:.9rem">COMUNE DI ASCEA Partita IVA: <strong>03519370658</strong></p>
  </div>
</section>'''
    page('contatti.html', 'Contatti – Ascea Turismo 360', 'Contatti di Ascea Turismo 360.', body)

if __name__ == '__main__':
    build_home(); build_borghi(); build_luoghi(); build_blog(); build_progetto(); build_mappa(); build_soggiornare(); build_contatti()
