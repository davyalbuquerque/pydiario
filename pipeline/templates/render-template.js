const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ── CONFIG ── editável por run ─────────────────────────────────────
const LOGO_FILE = '__LOGO_FILE__'; // ex: logo-politica-ready.png
// ──────────────────────────────────────────────────────────────────

(async () => {
  const dir = __dirname;
  const logosDir = path.join(dir, '..', '..', 'assets', 'logos');

  // Logo como base64 para evitar problemas com file:// no Windows
  const logoPath = path.join(logosDir, LOGO_FILE);
  const logoB64 = fs.readFileSync(logoPath).toString('base64');
  const logoSrc = `data:image/png;base64,${logoB64}`;

  // Ler template HTML e substituir logo
  let html = fs.readFileSync(path.join(dir, 'post-image.html'), 'utf8');
  html = html.replace('__LOGO_SRC__', logoSrc);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const outputPath = path.join(dir, 'post-image.png');
  await page.screenshot({
    path: outputPath,
    clip: { x: 0, y: 0, width: 1080, height: 1350 }
  });

  await browser.close();
  console.log('✅ post-image.png gerado em:', outputPath);
})();
