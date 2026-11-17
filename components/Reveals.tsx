"use client";

import { useEffect } from "react";

// Comparsa allo scroll: mette `data-in` sugli elementi `[data-reveal]` quando entrano in vista (una volta sola).
// Le animazioni sono in globals.css; senza JavaScript il contenuto è già visibile.
export function Reveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    const watch = () => document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));
    watch();
    // elementi aggiunti dopo (es. filtro dei lavori)
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
