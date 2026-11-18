import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statico: `npm run build` genera `out/` (solo HTML/CSS/JS), da caricare via FTP
  output: "export",
  // GitHub Pages pubblica il sito in /ascea-turismo-360/: il workflow imposta NEXT_PUBLIC_BASE_PATH
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // CSS incorporato nell'HTML: niente richiesta bloccante al primo caricamento
  experimental: { inlineCss: true },
  // `npm run dev` aperto dall'iPhone sulla stessa Wi-Fi
  allowedDevOrigins: ["192.168.*.*"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
