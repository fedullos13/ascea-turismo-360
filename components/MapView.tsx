"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LMap, LayerGroup } from "leaflet";
import "leaflet/dist/leaflet.css";
import { punti, type Punto } from "@/lib/site";

// Mappa Leaflet con i borghi e i luoghi. Le posizioni sono indicative (da verificare).
// Tile OpenStreetMap per ora; in produzione un provider con chiave (Pisciotta usa MapTiler).
type Filter = "tutti" | Punto["tipo"];

export function MapView({
  only,
  filters = false,
  className = "map",
  label = "Mappa di Ascea con borghi e luoghi",
}: {
  only?: string; // "luogo:palazzo-ricci" → un solo punto, centrato
  filters?: boolean;
  className?: string;
  label?: string;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<LMap | null>(null);
  const layers = useRef<Partial<Record<Punto["tipo"], LayerGroup>>>({});
  const [filter, setFilter] = useState<Filter>("tutti");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      if (cancelled || !el.current || map.current) return;
      const m = L.map(el.current, { scrollWheelZoom: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(m);
      const icon = (color: string) =>
        L.divIcon({
          className: "pin",
          iconSize: [30, 40],
          iconAnchor: [15, 40],
          popupAnchor: [0, -36],
          html: `<svg viewBox="0 0 30 40" aria-hidden="true"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.9 15 40 15 40s15-14.1 15-25.2C30 6.6 23.3 0 15 0z" fill="${color}"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>`,
        });
      const pts = punti.filter((p) => !only || only === `${p.tipo}:${p.slug}`);
      for (const p of pts) {
        const popup = `<strong>${p.name}</strong><span>${p.sub}</span>${only ? "" : `<br><a href="${p.href}">Scopri di più →</a>`}`;
        const marker = L.marker([p.lat, p.lng], { icon: icon(p.color), title: p.name, alt: p.name }).bindPopup(popup);
        (layers.current[p.tipo] ??= L.layerGroup().addTo(m)).addLayer(marker);
      }
      if (only && pts[0]) m.setView([pts[0].lat, pts[0].lng], 14);
      else m.fitBounds(pts.map((p) => [p.lat, p.lng] as [number, number]), { padding: [36, 36] });
      map.current = m;
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      layers.current = {};
    };
  }, [only]);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    for (const [tipo, layer] of Object.entries(layers.current)) {
      if (!layer) continue;
      if (filter === "tutti" || filter === tipo) layer.addTo(m);
      else m.removeLayer(layer);
    }
  }, [filter]);

  return (
    <>
      {filters && (
        <div className="filtri" role="group" aria-label="Mostra sulla mappa">
          {(
            [
              ["tutti", "Tutto"],
              ["borgo", "Borghi"],
              ["luogo", "Luoghi"],
            ] as [Filter, string][]
          ).map(([f, label]) => (
            <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {label}
            </button>
          ))}
        </div>
      )}
      <div ref={el} className={className} role="region" aria-label={label} />
    </>
  );
}
