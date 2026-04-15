# PY Diário — Referência Compacta

## Categorias

| Categoria | Cor | Logo |
|-----------|-----|------|
| POLÍTICA | #c4170c | logo-politica-ready.png |
| ECONOMÍA | #0000FF | logo-economia-ready.png |
| DEPORTES | #00A651 | logo-deportes-ready.png |
| VIOLENCIA | #FFD700 | logo-violencia-ready.png |
| NEGOCIOS | #FF6600 | logo-negocios-ready.png |
| CULTURA | #5B0090 | logo-cultura-ready.png |
| RURAL | #B8A050 | logo-rural-ready.png |
| ESTILO DE VIDA | #D4007A | logo-estilo-vida-ready.png |

| URGENTE | #FF0000 | logo-politica-ready.png |

**IMPORTANTE:** As cores acima são extraídas das logos PNG reais. Borda, tag e logo devem ser SEMPRE a mesma cor.
URGENTE usa vermelho (#FF0000) e a logo de POLÍTICA (vermelha) como base.

## Grade de Publicação (horários de Asunción, UTC-4)

| Horário | Categoria |
|---|---|
| 06:30 | POLÍTICA |
| 08:00 | ECONOMÍA |
| 10:00 | NEGOCIOS |
| 12:00 | DEPORTES |
| 14:00 | VIOLENCIA |
| 16:30 | RURAL |
| 19:00 | CULTURA |
| 21:00 | ESTILO DE VIDA |

Breaking news: consultas às 06:00, 12:00, 18:00, 00:00. Só publica extra se realmente urgente.

## Fontes por categoria

**Todas:** elnacional.com.py, abc.com.py, lanacion.com.py, ultimahora.com, hoy.com.py
**NEGOCIOS:** + forbes.com.py, 5dias.com.py
**ECONOMÍA:** + ip.gov.py, bcp.gov.py

## Regras editoriais

- Página isenta politicamente — nunca tomar partido
- Pode defender liberalismo econômico sem confronto ideológico
- Títulos em espanhol, factuais, sem sensacionalismo
- Nunca repetir pauta já publicada (checar _memory/runs.md)

## Regras de foto

- Checar o que ABC Color, Última Hora e La Nación usam para a pauta
- Priorizar foto com 1 pessoa em destaque quando possível
- Mínimo 800px de largura
- Sujeito principal nos primeiros 950px (acima do bloco de título)
- background-position: ajustar para manter sujeito na área superior
- VERIFICAR ENQUADRAMENTO: após definir bg-position, confirmar mentalmente que o sujeito principal (rosto/corpo da pessoa, ou elemento central) NÃO ficará cortado no topo nem coberto pelo título na base
- Se a foto original for paisagem (horizontal) e o sujeito estiver centralizado, usar `center 20%` ou `center top` para puxar para cima

## Layout (1080×1350px)

- Borda: 10px solid {cor da categoria}
- Logo: topo centralizado, h=110px, base64 via render.js
- Overlay topo: rgba(0,0,0,0.85)→transparente (260px)
- Overlay base: transparente→rgba(0,0,0,0.97) (750px)
- Tag: Arial Black 22px, cor categoria, uppercase
- Título: Arial Black 72px, branco, máx 4 linhas
- Content block: bottom 90px, left 72px, width 936px

## Estilo de caption (caption.txt)

Formato:
```
#CATEGORIA | Headline da notícia

Parágrafo 1 — contexto do fato (2-3 frases, tom jornalístico, dados concretos)

Parágrafo 2 — detalhes, impacto, declarações (2-3 frases)

#hashtag1 #hashtag2 #Paraguay #noticias #pydiario
```

Exemplo:
```
#NEGOCIOS | Paraguay busca su próximo embajador culinario en la séptima edición del S.Pellegrino Young Chef Academy

El lanzamiento de la séptima edición del S.Pellegrino Young Chef Academy Competition vuelve a poner a Paraguay en el radar de la alta gastronomía internacional, con una apuesta que trasciende la competencia y se posiciona como una plataforma de visibilidad, formación y proyección global para el talento joven.

Referentes del sector gastronómico, chefs y actores de la industria se reunieron para dar inicio a una nueva convocatoria que busca identificar al próximo embajador culinario del país.

#gastronomia #SPellegrino #Paraguay #noticias #pydiario
```

Tom: jornalístico profissional, factual, denso em informação. Nunca raso ou genérico.

## Hashtags (sempre incluir mix de gerais + locais)

Obrigatórias: #Paraguay #noticias #pydiario
Locais recomendadas: #Asuncion #NoticiasPY #ParaguayNoticias
Adicionar 2-3 específicas da pauta (ex: #ChampionsLeague, #maquila, #FMI)
