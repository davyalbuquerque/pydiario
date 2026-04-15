const fs = require('fs');
const path = require('path');

// Carrega variáveis do .env
const envPath = path.join(__dirname, '..', '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) env[match[1].trim()] = match[2].trim();
});

const INSTAGRAM_USER_ID = env.INSTAGRAM_USER_ID;
const INSTAGRAM_ACCESS_TOKEN = env.INSTAGRAM_ACCESS_TOKEN;
const API_VERSION = 'v21.0';

// ── CONFIG ── editável por run ─────────────────────────────────────
const CAPTION = `📰 Paraguay crece 4,2%: el FMI confirma que somos los mejores de la región

El Fondo Monetario Internacional destacó el sólido desempeño económico de Paraguay, con una proyección de crecimiento del 4,2% para 2026, liderando la región.

#Paraguay #FMI #economia #crecimiento #pydiario`;
// ──────────────────────────────────────────────────────────────────

async function uploadImage(imagePath) {
  console.log('📤 Fazendo upload da imagem...');

  const imageBuffer = fs.readFileSync(imagePath);
  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);

  const reqtypePart = `--${boundary}\r\nContent-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n`;
  const filePart = `--${boundary}\r\nContent-Disposition: form-data; name="fileToUpload"; filename="post-image.png"\r\nContent-Type: image/png\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;

  const body = Buffer.concat([
    Buffer.from(reqtypePart),
    Buffer.from(filePart),
    imageBuffer,
    Buffer.from(footer)
  ]);

  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body: body
  });
  const url = (await res.text()).trim();

  if (!url.startsWith('http')) {
    throw new Error(`Upload falhou: ${url}`);
  }

  console.log(`✅ Imagem hospedada em: ${url}`);
  return url;
}

async function createMediaContainer(imageUrl, caption) {
  console.log('📦 Criando container de mídia no Instagram...');

  const params = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: INSTAGRAM_ACCESS_TOKEN
  });

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${INSTAGRAM_USER_ID}/media`,
    { method: 'POST', body: params }
  );
  const data = await res.json();

  if (data.error) {
    throw new Error(`Erro ao criar container: ${JSON.stringify(data.error)}`);
  }

  console.log(`✅ Container criado: ${data.id}`);
  return data.id;
}

async function checkStatus(containerId) {
  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${containerId}?fields=status_code&access_token=${INSTAGRAM_ACCESS_TOKEN}`
  );
  const data = await res.json();
  return data.status_code;
}

async function waitForProcessing(containerId, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await checkStatus(containerId);
    if (status === 'FINISHED') return true;
    if (status === 'ERROR') throw new Error('Instagram rejeitou a imagem');
    console.log(`⏳ Processando... (${status})`);
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error('Timeout: imagem não foi processada a tempo');
}

async function publishMedia(containerId) {
  console.log('📱 Publicando no Instagram...');

  const params = new URLSearchParams({
    creation_id: containerId,
    access_token: INSTAGRAM_ACCESS_TOKEN
  });

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${INSTAGRAM_USER_ID}/media_publish`,
    { method: 'POST', body: params }
  );
  const data = await res.json();

  if (data.error) {
    throw new Error(`Erro ao publicar: ${JSON.stringify(data.error)}`);
  }

  console.log(`✅ Post publicado! ID: ${data.id}`);
  return data.id;
}

(async () => {
  try {
    const dir = __dirname;
    const imagePath = path.join(dir, 'post-image.png');

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Imagem não encontrada: ${imagePath}`);
    }

    // 1. Upload da imagem para URL pública
    const imageUrl = await uploadImage(imagePath);

    // 2. Criar container de mídia
    const containerId = await createMediaContainer(imageUrl, CAPTION);

    // 3. Aguardar processamento
    await waitForProcessing(containerId);

    // 4. Publicar
    const postId = await publishMedia(containerId);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ POST PUBLICADO COM SUCESSO!');
    console.log(`📱 Post ID: ${postId}`);
    console.log(`🔗 https://www.instagram.com/pydiario/`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  } catch (err) {
    console.error('\n❌ Erro na publicação:', err.message);
    process.exit(1);
  }
})();
