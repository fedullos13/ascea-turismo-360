"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { asset } from "@/lib/base";

// Header fisso come Pisciotta Borgo Vivo: logo, menu al centro, "Contatti" a destra.
// Sotto i 1180 px: hamburger e menu a tutto schermo.
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  const ctas = (
    <div className="header-cta">
      <Link className="btn" href="/contatti/" onClick={() => setOpen(false)}>
        Contatti
      </Link>
    </div>
  );

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Ascea Turismo 360 – Home">
            <img src={asset("/brand/logo-ascea-turismo360.png")} alt="Ascea Turismo 360" width={725} height={250} />
          </Link>
          <nav className="nav-main" aria-label="Menu principale">
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {ctas}
          <button
            className="burger"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className="mobile-menu" id="mobile-menu" aria-hidden={!open} inert={!open}>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        {ctas}
      </div>
    </>
  );
}
