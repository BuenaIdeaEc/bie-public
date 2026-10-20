// Genera una imagen con Soul v2 (Higgsfield) y la guarda optimizada en public/images/productos/<slug>.webp.
// Uso: node --env-file=.env.local scripts/higgsfield/image.ts <slug> "<prompt>" [aspecto]
import { config, higgsfield } from '@higgsfield/client/v2';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const [slug, prompt, aspect = '1:1'] = process.argv.slice(2);
const credentials = process.env.HF_CREDENTIALS;
if (!slug || !prompt) { console.error('Uso: image.ts <slug> "<prompt>" [aspecto]'); process.exit(1); }
if (!credentials || !credentials.includes(':')) { console.error('Falta HF_CREDENTIALS en .env.local'); process.exit(1); }
config({ credentials });
mkdirSync('scripts/higgsfield/out', { recursive: true });
mkdirSync('public/images/productos', { recursive: true });
const log = (o: object) => appendFileSync('scripts/higgsfield/out/log.jsonl', JSON.stringify({ at: new Date().toISOString(), kind: 'image', slug, ...o }) + '\n');

try {
  const r = await higgsfield.subscribe('higgsfield-ai/soul/v2/standard', { input: { prompt, aspect_ratio: aspect }, withPolling: true });
  const url = r.images?.[0]?.url;
  log({ request_id: r.request_id, status: r.status, url, prompt });
  if (r.status !== 'completed' || !url) { console.error(`[${slug}] sin imagen:`, JSON.stringify(r)); process.exit(2); }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(`scripts/higgsfield/out/${slug}.orig`, buf);
  const info = await sharp(buf).resize({ width: 900, height: 900, fit: 'cover' }).webp({ quality: 82 }).toFile(`public/images/productos/${slug}.webp`);
  console.log(`[${slug}] OK ${r.request_id} ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB\n${url}`);
} catch (err) {
  const e = err as { name?: string; message?: string };
  log({ error: e.name, message: e.message });
  console.error(`[${slug}] error ${e.name}: ${e.message}`);
  process.exit(6);
}
