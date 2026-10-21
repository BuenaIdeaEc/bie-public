// Graba un recorrido real por la página de ejemplo (scroll suave) y captura una imagen fija.
// Uso: node scripts/record-demo.mjs  (requiere el servidor de desarrollo en :4321)
import { chromium } from 'playwright';
import { mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';

const URL = 'http://localhost:4321/lab/demo-web/';
const tmp = 'scripts/higgsfield/out/rec';
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
mkdirSync('public/videos/productos', { recursive: true });

const browser = await chromium.launch();
// cuadrado: es lo que muestra el mosaico de productos
const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 1, recordVideo: { dir: tmp, size: { width: 1000, height: 1000 } } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
const steps = 180;
for (let i = 0; i <= steps; i++) {
  const t = i / steps, e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  await page.evaluate(y => window.scrollTo(0, y), Math.round(total * e));
  await page.waitForTimeout(33);
}
await page.waitForTimeout(900);
await ctx.close();
const webm = readdirSync(tmp).find(f => f.endsWith('.webm'));
renameSync(`${tmp}/${webm}`, `${tmp}/demo.webm`);

// imagen fija a 1440 para la home y la ficha
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p2 = await ctx2.newPage();
await p2.goto(URL, { waitUntil: 'networkidle' });
await p2.waitForTimeout(600);
await p2.screenshot({ path: `${tmp}/demo-1440.png` });
await p2.setViewportSize({ width: 390, height: 844 });
await p2.waitForTimeout(400);
await p2.screenshot({ path: `${tmp}/demo-390.png` });
await ctx2.close();
await browser.close();

execSync(`ffmpeg -v error -y -i ${tmp}/demo.webm -vf "scale=900:900,format=yuv420p" -c:v libx264 -preset slow -crf 24 -movflags +faststart -an public/videos/productos/pagina-web.mp4`);
execSync(`ffmpeg -v error -y -i ${tmp}/demo-1440.png -vf "scale=900:900:force_original_aspect_ratio=increase,crop=900:900" public/images/productos/pagina-web.webp`);
execSync(`ffmpeg -v error -y -i ${tmp}/demo-1440.png -vf "scale=1600:-2" public/images/demo/web-1440.webp`);
execSync(`ffmpeg -v error -y -i ${tmp}/demo-390.png -vf "scale=600:-2" public/images/demo/web-390.webp`);
console.log('ok');
