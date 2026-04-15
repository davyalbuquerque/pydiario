const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = __dirname;
  const logosDir = path.join(dir, '..', '..', 'assets', 'logos');

  const logoPath = path.join(logosDir, 'logo-economia-ready.png');
  const logoB64 = fs.readFileSync(logoPath).toString('base64');
  const logoSrc = `data:image/png;base64,${logoB64}`;

  let html = fs.readFileSync(path.join(dir, 'post-image.html'), 'utf8');
  html = html.replace('__LOGO_SRC__', logoSrc);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: path.join(dir, 'post-image.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1350 }
  });

  await browser.close();
  console.log('✅ post-image.png gerado');
})();
