/**
 * BIE — Generador de tarjetas OG (1200x630) con la identidad actual: negro, rojo, cuadrado, serif.
 * Genera og-default.jpg (home) + una por producto leyendo src/data/products.ts.
 * Ejecutar: node generate-og.mjs   (usa Playwright, ya en devDependencies)
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'public/images/og');
fs.mkdirSync(OUT, { recursive: true });

// Extraer slug + nombre ES + fase de products.ts (suficiente para las tarjetas)
const src = fs.readFileSync(path.join(__dirname, 'src/data/products.ts'), 'utf8');
const products = [];
for (const seg of src.split("\n  {\n    slug: '").slice(1)) {
  const slug = seg.slice(0, seg.indexOf("'"));
  const head = seg.slice(0, 900);
  const ph = head.match(/phase: \{ num: '(\d+)', title: B\('([^']+)'/);
  const nm = head.match(/\n    name: B\('([^']+)'/);
  if (ph && nm) products.push({ slug, phaseNum: ph[1], phase: ph[2], name: nm[1] });
}

const card = ({ kicker, title, sub }) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;800;900&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#070709;font-family:'Poppins',sans-serif;position:relative;color:#fff}
.grid{position:absolute;inset:0;opacity:.08;background-image:linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px);background-size:60px 60px;
  -webkit-mask-image:radial-gradient(70% 70% at 78% 40%,#000,transparent)}
.glow{position:absolute;right:-140px;top:50%;transform:translateY(-50%);width:640px;height:640px;background:radial-gradient(50% 50% at 50% 50%,rgba(229,57,53,.22),transparent 70%)}
.cube{position:absolute;right:300px;top:46%;transform:translateY(-50%) rotate(-8deg)}
.f{position:absolute;background:rgba(229,57,53,.9);width:150px;height:150px;left:0;top:0}
.t{position:absolute;width:150px;height:52px;left:26px;top:-52px;background:#141418;border:1.5px solid rgba(255,255,255,.35);transform:skewX(-45deg);transform-origin:bottom}
.r{position:absolute;width:52px;height:150px;left:150px;top:-26px;background:#0d0d10;border:1.5px solid rgba(255,255,255,.3);transform:skewY(-45deg);transform-origin:left}
.fb{border:1.5px solid rgba(255,255,255,.6)}
.px{position:absolute;width:16px;height:16px;background:#fff;left:14px;top:14px}
.content{position:relative;z-index:5;padding:84px 90px;height:100%;display:flex;flex-direction:column;justify-content:center;max-width:820px}
.kicker{font-family:'JetBrains Mono',monospace;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:#E53935;display:flex;align-items:center;gap:14px;margin-bottom:30px}
.kicker::before{content:'';width:14px;height:14px;background:#E53935;display:inline-block}
h1{font-size:76px;font-weight:800;letter-spacing:-.035em;line-height:1.02}
h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;font-size:1.05em}
p{margin-top:26px;font-size:25px;color:rgba(255,255,255,.55);line-height:1.5;max-width:640px}
.brand{position:absolute;left:90px;bottom:52px;font-weight:900;font-size:26px;letter-spacing:-.02em;display:flex;align-items:center;gap:12px}
.brand i{width:12px;height:12px;background:#E53935;display:inline-block}
.url{position:absolute;right:90px;bottom:56px;font-family:'JetBrains Mono',monospace;font-size:16px;color:rgba(255,255,255,.4);letter-spacing:.04em}
.bar{position:absolute;left:0;right:0;bottom:0;height:6px;background:#E53935}
</style></head><body>
<div class="grid"></div><div class="glow"></div>
<div class="cube"><span class="t"></span><span class="r"></span><span class="f fb"><span class="px"></span></span></div>
<div class="content"><span class="kicker">${kicker}</span><h1>${title}</h1><p>${sub}</p></div>
<div class="brand"><i></i>BIE</div><span class="url">businessintelligence.solutions</span><div class="bar"></div>
</body></html>`;

const cards = [
  { file: 'og-default.jpg', kicker: 'Business Intelligence Enhancer', title: 'Las agencias están <em>muertas.</em>', sub: 'Te entregamos lo que necesitas para crecer: sistemas, marca y tecnología trabajando juntos.' },
  ...products.map((p) => ({ file: `${p.slug}.jpg`, kicker: `Fase ${p.phaseNum} · ${p.phase}`, title: p.name.replace(/ (\S+)$/, ' <em>$1</em>'), sub: 'Sin precios inflados ni promesas vacías: qué es, cómo trabajamos y qué logras. Directo por WhatsApp.' })),
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await page.setContent(card(c), { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT, c.file), type: 'jpeg', quality: 88 });
  console.log('og:', c.file);
}
await browser.close();
