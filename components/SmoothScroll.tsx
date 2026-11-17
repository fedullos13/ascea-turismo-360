"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Scroll fluido (Lenis) con rotella e trackpad, disattivato con "riduci movimento".
// I link interni (#...) scorrono morbidi e si fermano sotto la navbar.
// Lenis è disponibile in window.__lenis.
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const docTop = (el: HTMLElement | null) => {
      let y = 0;
      for (; el; el = el.offsetParent as HTMLElement | null) y += el.offsetTop;
      return y;
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      if (a.hash.length < 2) {
        e.preventDefault(); // link ancora da collegare
        return;
      }
      const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      const nav = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      lenis.scrollTo(target.id === "top" ? 0 : docTop(target) - nav + 1, { duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
