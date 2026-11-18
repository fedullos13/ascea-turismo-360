// Percorso base del sito: vuoto in locale e sul dominio finale, "/ascea-turismo-360" su GitHub Pages (impostato dal workflow).
// I <Link> di Next lo aggiungono da soli; per <img>, srcset e link scritti a mano si usa `asset()`.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;
