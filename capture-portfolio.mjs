/**
 * Capture portfolio screenshots using Playwright
 * Run: node capture-portfolio.mjs
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'public/images/portfolio');

const sites = [
  {
    url: 'https://www.carolinaarroba.com/',
    slug: 'carolina-arroba',
    waitUntil: 'domcontentloaded',
    extraWait: 4000,
    // Close popup if present
    popup: '.klaviyo-close-form, [data-testid="close"], button[aria-label*="close"], button[aria-label*="Close"], .modal-close',
  },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const site of sites) {
  try {
    const page = await context.newPage();
    console.log(`Capturing ${site.url}...`);
    await page.goto(site.url, { waitUntil: site.waitUntil ?? 'networkidle', timeout: 40000 });
    await page.waitForTimeout(site.extraWait ?? 2000);

    // Try to close popups
    if (site.popup) {
      try {
        const closeBtn = page.locator(site.popup).first();
        if (await closeBtn.isVisible({ timeout: 2000 })) {
          await closeBtn.click();
          await page.waitForTimeout(500);
        }
      } catch (_) {}
    }

    // Close any chat widgets
    const chatClose = page.locator('#chat-card button, .qm-panel button[aria-label*="Cerrar"], [aria-label*="close chat"]').first();
    try {
      if (await chatClose.isVisible({ timeout: 1000 })) {
        await chatClose.click();
        await page.waitForTimeout(500);
      }
    } catch (_) {}

    await page.screenshot({
      path: `${OUT}/${site.slug}.jpg`,
      type: 'jpeg',
      quality: 90,
      clip: { x: 0, y: 0, width: 1440, height: 860 },
    });
    console.log(`  ✓ Saved ${site.slug}.jpg`);
    await page.close();
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
  }
}

await browser.close();
console.log('Done.');
