"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MLMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { punti, type Punto } from "@/lib/site";

// Mappa vettoriale MapLibre GL con i borghi e i luoghi, come Pisciotta. Le posizioni sono indicative (da verificare).
// Stile OpenFreeMap "Positron" (gratuito, senza chiave). Con la chiave MapTiler: "https://api.maptiler.com/maps/dataviz-v4/style.json?key=…" (lo stile di Pisciotta).
const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

type Filter = "tutti" | Punto["tipo"];

const pinSvg = (color: string) =>
  `<svg viewBox="0 0 30 40" width="30" height="40" aria-hidden="true"><path d="M15 0C6.7 0 0 6.6 0 14.8 0 25.9 15 40 15 40s15-14.1 15-25.2C30 6.6 23.3 0 15 0z" fill="${color}"/><circle cx="15" cy="14.5" r="5.5" fill="#fff"/></svg>`;

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
  const markers = useRef<{ tipo: Punto["tipo"]; marker: Marker }[]>([]);
  const [filter, setFilter] = useState<Filter>("tutti");

  useEffect(() => {
    let cancelled = false;
    let map: MLMap | null = null;
    (async () => {
      const { default: maplibregl } = await import("maplibre-gl");
      if (cancelled || !el.current) return;
      const pts = punti.filter((p) => !only || only === `${p.tipo}:${p.slug}`);
      map = new maplibregl.Map({
        container: el.current,
        style: MAP_STYLE,
        center: pts[0] ? [pts[0].lng, pts[0].lat] : [15.19, 40.14],
        zoom: 13,
        maxZoom: 18,
        cooperativeGestures: true, // zoom con ctrl/⌘ + rotella, due dita su mobile: la pagina continua a scorrere
        attributionControl: { compact: true },
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText": "Usa Ctrl + rotella per ingrandire la mappa",
          "CooperativeGesturesHandler.MacHelpText": "Usa ⌘ + rotella per ingrandire la mappa",
          "CooperativeGesturesHandler.MobileHelpText": "Usa due dita per spostare la mappa",
          "NavigationControl.ZoomIn": "Ingrandisci",
          "NavigationControl.ZoomOut": "Riduci",
          "NavigationControl.ResetBearing": "Orienta a nord",
        },
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      for (const p of pts) {
        const pin = document.createElement("div");
        pin.className = "pin";
        pin.innerHTML = pinSvg(p.color);
        pin.setAttribute("aria-label", p.name);
        pin.setAttribute("role", "img");
        const popup = new maplibregl.Popup({ offset: [0, -36], closeButton: true, maxWidth: "260px" }).setHTML(
          `<strong>${p.name}</strong><span>${p.sub}</span>${only ? "" : `<br><a href="${p.href}">Scopri di più →</a>`}`,
        );
        const marker = new maplibregl.Marker({ element: pin, anchor: "bottom" }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(map);
        markers.current.push({ tipo: p.tipo, marker });
      }

      if (!only && pts.length > 1) {
        const bounds = new maplibregl.LngLatBounds();
        pts.forEach((p) => bounds.extend([p.lng, p.lat]));
        map.fitBounds(bounds, { padding: 50, maxZoom: 14, duration: 0 });
      }
    })();
    return () => {
      cancelled = true;
      map?.remove();
      markers.current = [];
    };
  }, [only]);

  useEffect(() => {
    for (const { tipo, marker } of markers.current) {
      const show = filter === "tutti" || filter === tipo;
      marker.getElement().style.display = show ? "" : "none";
      if (!show) marker.getPopup()?.remove();
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
