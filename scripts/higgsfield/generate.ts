// Genera un video con Seedance 2.5 y registra request_id y URL en scripts/higgsfield/out/log.jsonl.
// Uso: node --env-file=.env.local scripts/higgsfield/generate.ts <nombre> "<prompt>" [duracion] [resolucion] [aspecto]
import { config, higgsfield } from '@higgsfield/client/v2';
import { appendFileSync, mkdirSync } from 'node:fs';

const [name, prompt, duration = '5', resolution = '720p', aspect = '16:9', model = 'kling-video/v3.0-turbo/text-to-video'] = process.argv.slice(2);
const credentials = process.env.HF_CREDENTIALS;
if (!name || !prompt) { console.error('Uso: generate.ts <nombre> "<prompt>" [duracion] [resolucion] [aspecto]'); process.exit(1); }
if (!credentials || !credentials.includes(':')) { console.error('Falta HF_CREDENTIALS en .env.local'); process.exit(1); }

config({ credentials });
mkdirSync('scripts/higgsfield/out', { recursive: true });
const log = (o: object) => appendFileSync('scripts/higgsfield/out/log.jsonl', JSON.stringify({ at: new Date().toISOString(), name, ...o }) + '\n');

try {
  const r = await higgsfield.subscribe(model, {
    input: model.includes('/std/') ? { prompt, duration: Number(duration), aspect_ratio: aspect, sound: 'off', cfg_scale: Number(process.env.CFG ?? 0.7) } : { prompt, duration: Number(duration), resolution, aspect_ratio: aspect },
    withPolling: true,
  });
  const url = r.video?.url;
  log({ model, request_id: r.request_id, status: r.status, url, prompt });
  if (r.status === 'completed' && url) console.log(`[${name}] OK ${r.request_id}\n${url}`);
  else { console.error(`[${name}] sin video:`, JSON.stringify(r)); process.exit(2); }
} catch (err) {
  const e = err as { name?: string; message?: string };
  log({ error: e.name, message: e.message });
  console.error(`[${name}] error ${e.name}: ${e.message}`);
  process.exit(6);
}
