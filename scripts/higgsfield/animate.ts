// Anima una foto de producto (imagen → video) con Kling 3.0 y la deja en public/videos/productos/<slug>.mp4.
// Uso: node --env-file=.env.local scripts/higgsfield/animate.ts <slug> "<prompt>" [modelo] [duracion]
// La URL de la foto sale de scripts/higgsfield/out/fotos-v2.json (fotos aprobadas por EGO).
import { config, higgsfield } from '@higgsfield/client/v2';
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const [slug, prompt, model = 'kling-video/v3.0/std/image-to-video', duration = '5'] = process.argv.slice(2);
const credentials = process.env.HF_CREDENTIALS;
if (!slug || !prompt) { console.error('Uso: animate.ts <slug> "<prompt>" [modelo] [duracion]'); process.exit(1); }
if (!credentials || !credentials.includes(':')) { console.error('Falta HF_CREDENTIALS en .env.local'); process.exit(1); }
const fotos = JSON.parse(readFileSync('scripts/higgsfield/out/fotos-v2.json', 'utf8')) as Record<string, string>;
const image_url = fotos[slug];
if (!image_url) { console.error('Sin foto para ' + slug); process.exit(1); }

config({ credentials });
mkdirSync('scripts/higgsfield/out/anim', { recursive: true });
mkdirSync('public/videos/productos', { recursive: true });
const log = (o: object) => appendFileSync('scripts/higgsfield/out/log.jsonl', JSON.stringify({ at: new Date().toISOString(), kind: 'animate', slug, ...o }) + '\n');

try {
  const input: Record<string, unknown> = { prompt, image_url, duration: Number(duration), aspect_ratio: '1:1' };
  if (model.includes('/std/')) { input.sound = 'off'; input.cfg_scale = Number(process.env.CFG ?? 0.6); } else input.resolution = '720p';
  const r = await higgsfield.subscribe(model, { input, withPolling: true });
  const url = r.video?.url;
  log({ model, request_id: r.request_id, status: r.status, url, prompt });
  if (r.status !== 'completed' || !url) { console.error(`[${slug}] sin video:`, JSON.stringify(r)); process.exit(2); }
  const raw = `scripts/higgsfield/out/anim/${slug}.mp4`;
  writeFileSync(raw, Buffer.from(await (await fetch(url)).arrayBuffer()));
  execSync(`ffmpeg -v error -y -i ${raw} -vf "scale=900:900:force_original_aspect_ratio=increase,crop=900:900,format=yuv420p" -c:v libx264 -preset slow -crf 23 -movflags +faststart -an public/videos/productos/${slug}.mp4`);
  console.log(`[${slug}] OK ${r.request_id} → public/videos/productos/${slug}.mp4`);
} catch (err) {
  const e = err as { name?: string; message?: string };
  log({ error: e.name, message: e.message });
  console.error(`[${slug}] error ${e.name}: ${e.message}`);
  process.exit(6);
}
