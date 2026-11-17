// Anteprima della cartella out/ con compressione e cache come in produzione.
// Uso: npm run preview  →  http://localhost:4175 (4173 sito personale, 4174 RLB)
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = path.resolve(import.meta.dirname, "../out");
const PORT = Number(process.env.PORT ?? 4175);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".txt", ".xml", ".svg"]);

async function resolve(urlPath) {
  let p = path.join(ROOT, decodeURIComponent(urlPath));
  if (!p.startsWith(ROOT)) return null;
  try {
    if ((await fs.stat(p)).isDirectory()) p = path.join(p, "index.html");
    await fs.access(p);
    return p;
  } catch {
    return null;
  }
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    // Come su Apache: /chi-siamo → /chi-siamo/
    if (!path.extname(url.pathname) && !url.pathname.endsWith("/")) {
      res.writeHead(301, { Location: url.pathname + "/" + url.search }).end();
      return;
    }
    const file = (await resolve(url.pathname)) ?? path.join(ROOT, "404.html");
    const status = file.endsWith("404.html") && !url.pathname.startsWith("/404") ? 404 : 200;
    const ext = path.extname(file);
    const immutable = url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/img/");
    const headers = {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    };
    let body;
    try {
      body = await fs.readFile(file);
    } catch {
      // Durante `npm run build` la cartella out/ viene ricreata: rispondere con un errore invece di fermare il server
      res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" }).end("Build in corso, ricarica tra qualche secondo.");
      return;
    }
    if (COMPRESSIBLE.has(ext) && /\bbr\b/.test(req.headers["accept-encoding"] ?? "")) {
      body = zlib.brotliCompressSync(body);
      headers["Content-Encoding"] = "br";
      headers["Vary"] = "Accept-Encoding";
    }
    res.writeHead(status, headers).end(body);
  })
  .listen(PORT, "0.0.0.0", () => console.log(`Anteprima su http://localhost:${PORT}`));
