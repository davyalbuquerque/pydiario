const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const dir = __dirname;

  // Read logo as base64
  const logoPath = path.join(dir, '..', '..', 'assets', 'logos', 'logo-politica-ready.png');
  const logoB64 = fs.readFileSync(logoPath).toString('base64');
  const logoSrc = `data:image/png;base64,${logoB64}`;

  // Background photo — skyline aéreo de Assunção com Rio Paraguai (Última Hora / pauta FMI)
  const bgUrl = 'https://k2-prod-grupo-vierci.s3.us-east-1.amazonaws.com/brightspot/0d/1e/f17af4c34044be9922bfc1884e32/gv0rxi-wiaawjiz.jfif';

  // Read HTML template
  let html = fs.readFileSync(path.join(dir, 'post.html'), 'utf8');
  html = html.replace('__LOGO_SRC__', logoSrc);
  html = html.replace('__BG_URL__', bgUrl);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(dir, 'post-image.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1350 }
  });

  await browser.close();
  console.log('✅ post-image.png gerado com sucesso');
})();
