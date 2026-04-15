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

const IG_ID = env.INSTAGRAM_BUSINESS_ID;
const PAGE_TOKEN = env.FACEBOOK_PAGE_TOKEN;
const API_VERSION = 'v25.0';
const API_BASE = 'https://graph.facebook.com';

// Caption é lida de arquivo para preservar UTF-8 (acentos em espanhol)
const CAPTION = fs.readFileSync(path.join(__dirname, 'caption.txt'), 'utf8').trim();

async function uploadImage(imagePath) {
  console.log('📤 Fazendo upload da imagem...');

  const imageBuffer = fs.readFileSync(imagePath);
  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);

  const filePart = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="post-image.png"\r\nContent-Type: image/png\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;

  const body = Buffer.concat([
    Buffer.from(filePart),
    imageBuffer,
    Buffer.from(footer)
  ]);

  const res = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body: body
  });
  const data = await res.json();

  if (data.status !== 'success') {
    throw new Error(`Upload falhou: ${JSON.stringify(data)}`);
  }

  // Converte URL para download direto: tmpfiles.org/123/file.png → tmpfiles.org/dl/123/file.png
  const url = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
  console.log(`✅ Imagem hospedada em: ${url}`);
  return url;
}

async function createMediaContainer(imageUrl, caption) {
  console.log('📦 Criando container de mídia no Instagram...');

  const params = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: PAGE_TOKEN
  });

  const res = await fetch(`${API_BASE}/${API_VERSION}/${IG_ID}/media`, {
    method: 'POST',
    body: params
  });
  const data = await res.json();

  if (data.error) {
    throw new Error(`Erro ao criar container: ${JSON.stringify(data.error)}`);
  }

  console.log(`✅ Container criado: ${data.id}`);
  return data.id;
}

async function checkStatus(containerId) {
  const res = await fetch(
    `${API_BASE}/${API_VERSION}/${containerId}?fields=status_code&access_token=${PAGE_TOKEN}`
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
    await new Promise(r => setTimeout(r, 3000));
  }
  throw new Error('Timeout: imagem não foi processada a tempo');
}

async function publishMedia(containerId) {
  console.log('📱 Publicando no Instagram...');

  const params = new URLSearchParams({
    creation_id: containerId,
    access_token: PAGE_TOKEN
  });

  const res = await fetch(`${API_BASE}/${API_VERSION}/${IG_ID}/media_publish`, {
    method: 'POST',
    body: params
  });
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

    const imageUrl = await uploadImage(imagePath);
    const containerId = await createMediaContainer(imageUrl, CAPTION);
    await waitForProcessing(containerId);
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
