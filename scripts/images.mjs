// Ottimizza le foto: da `media/` (originali, non pubblicati) genera in `public/img/opt/`
// AVIF + WebP + JPG in più larghezze, e `lib/images.json` con dimensioni e larghezze disponibili.
// Uso: `npm run images` (va rilanciato solo quando si aggiunge o cambia una foto in `media/`).
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "media";
const OUT = "public/img/opt";
const WIDTHS = [480, 828, 1200, 1600, 2048, 2880];
// qualità scelte per foto: AVIF e WebP pesano molto meno del JPG a parità di resa
const Q = { avif: 52, webp: 76, jpg: 80 };

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const manifest = {};
let total = 0;
for (const file of (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
  const name = path.parse(file).name;
  const src = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await src.metadata();
  const widths = WIDTHS.filter((w) => w < width);
  const max = Math.min(width, 2880);
  if (!widths.includes(max) && (!widths.length || max - widths.at(-1) > 200)) widths.push(max);
  for (const w of widths) {
    const img = src.clone().resize({ width: w });
    const outs = [
      [img.clone().avif({ quality: Q.avif, effort: 6 }), "avif"],
      [img.clone().webp({ quality: Q.webp, effort: 6 }), "webp"],
      [img.clone().jpeg({ quality: Q.jpg, mozjpeg: true, progressive: true }), "jpg"],
    ];
    for (const [pipe, ext] of outs) {
      const info = await pipe.toFile(path.join(OUT, `${name}-${w}.${ext}`));
      total += info.size;
    }
  }
  manifest[name] = { w: width, h: height, widths };
  console.log(name.padEnd(14), `${width}×${height}`, "→", widths.join(", "));
}
await writeFile("lib/images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`Fatto: ${(total / 1e6).toFixed(1)} MB in ${OUT}`);
