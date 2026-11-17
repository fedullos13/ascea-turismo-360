"use client";

import { useState } from "react";
import { CardLuogo } from "@/components/Cards";
import { categorie, luoghi, type Categoria } from "@/lib/site";

// Elenco dei luoghi con i filtri per categoria
export function LuoghiGrid() {
  const [filter, setFilter] = useState<"tutti" | Categoria>("tutti");
  const list = filter === "tutti" ? luoghi : luoghi.filter((l) => l.cat === filter);
  return (
    <>
      <div className="filtri" role="group" aria-label="Filtra per categoria">
        {(["tutti", ...categorie] as const).map((c) => (
          <button key={c} className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c === "tutti" ? "Tutti" : c}
          </button>
        ))}
      </div>
      <div className="grid-luoghi">
        {list.map((l, i) => (
          <CardLuogo key={l.slug} l={l} i={i} />
        ))}
      </div>
    </>
  );
}
