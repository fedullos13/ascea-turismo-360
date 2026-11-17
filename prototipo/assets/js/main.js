/* Ascea Turismo 360 — prototipo (QCORE) */
(function () {
  document.documentElement.classList.remove('no-js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header ombra allo scroll */
  var header = document.querySelector('.site-header');
  function onScrollHeader() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* Menu mobile */
  var burger = document.querySelector('.burger');
  var mobile = document.getElementById('mobile-menu');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mobile.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger && mobile) {
    burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
    mobile.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* Hero: le foto scorrono in orizzontale mentre si scorre la pagina */
  var track = document.querySelector('.hero-track');
  if (track && !reduce) {
    var ticking = false;
    var move = function () {
      var y = Math.min(window.scrollY, window.innerHeight * 1.2);
      track.style.transform = 'translate3d(' + (-y * 0.18) + 'px,0,0)';
      ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(move); ticking = true; } }, { passive: true });
  }

  /* Comparsa elementi */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Filtri luoghi */
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var target = document.querySelector(group.getAttribute('data-filter-group'));
    group.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      group.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
      var f = b.getAttribute('data-filter');
      target.querySelectorAll('[data-cat]').forEach(function (card) {
        card.hidden = !(f === 'tutti' || card.getAttribute('data-cat') === f);
      });
    });
  });

  /* Mappe (Leaflet + OpenStreetMap / CARTO) */
  var PUNTI = window.ASCEA_PUNTI || [];
  function pinIcon(color) {
    return L.divIcon({
      className: 'pin', iconSize: [30, 40], iconAnchor: [15, 40], popupAnchor: [0, -36],
      html: '<svg viewBox="0 0 30 40" aria-hidden="true"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.9 15 40 15 40s15-14.1 15-25.2C30 6.6 23.3 0 15 0z" fill="' + color + '"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>'
    });
  }
  function initMap(el) {
    if (!window.L) return;
    var only = el.getAttribute('data-only');       // es. "luogo:palazzo-ricci"
    var interactive = el.getAttribute('data-interactive') !== 'false';
    var map = L.map(el, { scrollWheelZoom: false, zoomControl: interactive, dragging: interactive || !L.Browser.mobile, attributionControl: true });
    // Prototipo: tile OpenStreetMap. In produzione usare un provider con chiave (es. MapTiler, come Pisciotta).
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var layers = {}; var bounds = [];
    PUNTI.forEach(function (p) {
      if (only && only !== p.tipo + ':' + p.id) return;
      var m = L.marker([p.lat, p.lng], { icon: pinIcon(p.colore), title: p.nome, alt: p.nome })
        .bindPopup('<strong>' + p.nome + '</strong>' + (p.sotto ? '<span>' + p.sotto + '</span><br>' : '') + (p.url && !only ? '<a href="' + p.url + '">Scopri di più →</a>' : ''));
      (layers[p.tipo] = layers[p.tipo] || L.layerGroup().addTo(map)).addLayer(m);
      bounds.push([p.lat, p.lng]);
    });
    if (only && bounds.length) map.setView(bounds[0], 14);
    else if (bounds.length) map.fitBounds(bounds, { padding: [36, 36] });
    el._layers = layers; el._map = map;
  }
  document.querySelectorAll('.map').forEach(initMap);

  /* Filtri mappa completa */
  document.querySelectorAll('[data-map-filter]').forEach(function (group) {
    var mapEl = document.querySelector(group.getAttribute('data-map-filter'));
    group.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b || !mapEl._map) return;
      group.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
      var f = b.getAttribute('data-filter');
      Object.keys(mapEl._layers).forEach(function (k) {
        var on = f === 'tutti' || f === k;
        if (on) mapEl._layers[k].addTo(mapEl._map); else mapEl._map.removeLayer(mapEl._layers[k]);
      });
    });
  });

  /* Nota prototipo chiudibile */
  var note = document.querySelector('.proto-note');
  if (note) note.querySelector('button').addEventListener('click', function () { note.remove(); });
})();
