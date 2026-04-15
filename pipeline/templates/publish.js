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

// Caption é lida de arquivo para preservar UTF-8
const CAPTION = fs.readFileSync(path.join(__dirname, 'caption.txt'), 'utf8').trim();

// Horário agendado (opcional) — lido de schedule.txt se existir
// Formato em schedule.txt: YYYY-MM-DD HH:MM (horário de Asunción, UTC-4)
const schedulePath = path.join(__dirname, 'schedule.txt');
let SCHEDULED_TIME = null;
if (fs.existsSync(schedulePath)) {
  const raw = fs.readFileSync(schedulePath, 'utf8').trim();
  if (raw) {
    // Converte horário de Asunción (UTC-4) para Unix timestamp
    const asuncionDate = new Date(raw.replace(' ', 'T') + ':00-04:00');
    SCHEDULED_TIME = Math.floor(asuncionDate.getTime() / 1000);
  }
}

function buildMultipart(imageBuffer, boundary, fieldName, fileName) {
  const filePart = `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${fileName}"\r\nContent-Type: image/png\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;
  return Buffer.concat([Buffer.from(filePart), imageBuffer, Buffer.from(footer)]);
}

async function tryTmpfiles(imageBuffer) {
  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
  const body = buildMultipart(imageBuffer, boundary, 'file', 'post-image.png');
  const res = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body: body
  });
  const data = await res.json();
  if (data.status !== 'success') throw new Error('tmpfiles falhou');
  return data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
}

async function tryCatbox(imageBuffer) {
  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
  const reqPart = `--${boundary}\r\nContent-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n`;
  const filePart = `--${boundary}\r\nContent-Disposition: form-data; name="fileToUpload"; filename="post-image.png"\r\nContent-Type: image/png\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;
  const body = Buffer.concat([Buffer.from(reqPart), Buffer.from(filePart), imageBuffer, Buffer.from(footer)]);
  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body: body
  });
  const url = (await res.text()).trim();
  if (!url.startsWith('http')) throw new Error('catbox falhou');
  return url;
}

async function uploadImage(imagePath) {
  console.log('📤 Fazendo upload da imagem...');
  const imageBuffer = fs.readFileSync(imagePath);

  // Tenta hosts em ordem de prioridade
  const hosts = [
    { name: 'tmpfiles.org', fn: () => tryTmpfiles(imageBuffer) },
    { name: 'catbox.moe', fn: () => tryCatbox(imageBuffer) },
  ];

  for (const host of hosts) {
    try {
      const url = await host.fn();
      console.log(`✅ Imagem hospedada em ${host.name}: ${url}`);
      return url;
    } catch (e) {
      console.log(`⚠️ ${host.name} falhou: ${e.message}. Tentando próximo...`);
    }
  }
  throw new Error('Todos os hosts de upload falharam');
}

async function createMediaContainer(imageUrl, caption, scheduledTime) {
  const mode = scheduledTime ? '📅 Agendando' : '📦 Criando';
  console.log(`${mode} container de mídia no Instagram...`);

  const params = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: PAGE_TOKEN
  });

  // Se agendado, não publica imediatamente
  if (scheduledTime) {
    params.append('published', 'false');
    params.append('scheduled_publish_time', scheduledTime.toString());
  }

  const res = await fetch(`${API_BASE}/${API_VERSION}/${IG_ID}/media`, {
    method: 'POST',
    body: params
  });
  const data = await res.json();
  if (data.error) throw new Error(`Erro ao criar container: ${JSON.stringify(data.error)}`);
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
  if (data.error) throw new Error(`Erro ao publicar: ${JSON.stringify(data.error)}`);
  console.log(`✅ Post publicado! ID: ${data.id}`);
  return data.id;
}

(async () => {
  try {
    const dir = __dirname;
    const imagePath = path.join(dir, 'post-image.png');
    if (!fs.existsSync(imagePath)) throw new Error(`Imagem não encontrada: ${imagePath}`);

    const imageUrl = await uploadImage(imagePath);
    const containerId = await createMediaContainer(imageUrl, CAPTION, SCHEDULED_TIME);
    await waitForProcessing(containerId);

    if (SCHEDULED_TIME) {
      // Agendado — não precisa chamar media_publish (Instagram publica sozinho)
      const schedDate = new Date(SCHEDULED_TIME * 1000);
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📅 POST AGENDADO COM SUCESSO!');
      console.log(`⏰ Publicação: ${schedDate.toLocaleString('es-PY', { timeZone: 'America/Asuncion' })}`);
      console.log(`📦 Container ID: ${containerId}`);
      console.log(`🔗 https://www.instagram.com/pydiario/`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      // Publicação imediata
      const postId = await publishMedia(containerId);
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ POST PUBLICADO COM SUCESSO!');
      console.log(`📱 Post ID: ${postId}`);
      console.log(`🔗 https://www.instagram.com/pydiario/`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }

  } catch (err) {
    console.error('\n❌ Erro na publicação:', err.message);
    process.exit(1);
  }
})();
