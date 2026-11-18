"use client";

import type { ReactNode } from "react";

// Fascia di foto dell'apertura: il loop è in CSS (`hero-loop`); al passaggio del mouse rallenta senza scatti.
export function HeroTrack({ children }: { children: ReactNode }) {
  const setRate = (el: HTMLElement, rate: number) => el.getAnimations().forEach((a) => (a.playbackRate = rate));
  return (
    <div
      className="hero-track"
      aria-hidden="true"
      onMouseEnter={(e) => setRate(e.currentTarget, 1 / 3)}
      onMouseLeave={(e) => setRate(e.currentTarget, 1)}
    >
      {children}
    </div>
  );
}
