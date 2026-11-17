import data from "@/lib/articoli.json";

// Testi delle schede presi dal sito attuale asceaturismo.com (sezione Itinerari).
// Ogni blocco è [tag, html]: tag h2 | h3 | p; l'html contiene solo <strong> ed <em>.
type Block = [string, string];
const articoli = data as unknown as Record<string, Block[]>;

export function getArticle(key: string, title?: string): Block[] {
  const blocks = articoli[key] ?? [];
  // salta il primo titolo se ripete il nome della pagina (es. "Sentiero Aurella")
  if (title && blocks[0]?.[0] === "h2" && blocks[0][1].trim().toLowerCase() === title.toLowerCase()) return blocks.slice(1);
  return blocks;
}

export function getExcerpt(key: string, n = 2): string[] {
  return (articoli[key] ?? []).filter(([t]) => t === "p").slice(0, n).map(([, html]) => html);
}
