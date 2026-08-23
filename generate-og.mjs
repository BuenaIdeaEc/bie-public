/**
 * Generate OG default image as JPEG
 * Run: node generate-og.mjs
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'public/images/og');
fs.mkdirSync(OUT, { recursive: true });

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #0a0a0a;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    display: flex; align-items: center;
    position: relative;
  }
  .bg-grid {
    position: absolute; inset: 0; overflow: hidden;
  }
  .bg-grid svg { width: 100%; height: 100%; }
  .content {
    position: relative; z-index: 10;
    padding: 0 80px;
    width: 100%;
  }
  .tag {
    font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: #2E75B6;
    margin-bottom: 20px; display: block;
  }
  h1 {
    font-size: 68px; font-weight: 700; color: white;
    letter-spacing: -3px; line-height: 1.0;
    margin-bottom: 24px;
  }
  h1 span { color: #2E75B6; }
  p {
    font-size: 20px; color: rgba(255,255,255,0.45);
    line-height: 1.5; max-width: 680px;
  }
  .logo {
    position: absolute; top: 48px; right: 80px;
    font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.6);
    letter-spacing: 0.04em;
  }
  .accent-line {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px; background: #2E75B6;
  }
</style>
</head>
<body>
<div class="bg-grid">
  <svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g1" cx="80%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1A3A6A" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g1)"/>
    <g stroke="rgba(46,117,182,0.07)" stroke-width="1">
      <line x1="0" y1="157" x2="1200" y2="157"/>
      <line x1="0" y1="315" x2="1200" y2="315"/>
      <line x1="0" y1="472" x2="1200" y2="472"/>
      <line x1="300" y1="0" x2="300" y2="630"/>
      <line x1="600" y1="0" x2="600" y2="630"/>
      <line x1="900" y1="0" x2="900" y2="630"/>
    </g>
  </svg>
</div>
<div class="content">
  <span class="tag">Business Intelligence Enhancer</span>
  <h1>Ecosistemas de<br><span>Agentes IA</span><br>para PyMEs</h1>
  <p>Implementación en semanas. Resultados medibles. 99% autónomo.</p>
</div>
<div class="logo">BIE · businessintelligence.solutions</div>
<div class="accent-line"></div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle' });

await page.screenshot({
  path: `${OUT}/og-default.jpg`,
  type: 'jpeg',
  quality: 92,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});

console.log('✓ OG image saved to public/images/og/og-default.jpg');
await browser.close();
