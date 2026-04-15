# Identidade Visual — PY Diário (@pydiario)

## Formato

- **Dimensão:** 1080×1350px (portrait 4:5)
- **Fundo:** foto full-bleed com `background-size: cover`

## Layout

```
┌─────────────────────────────────┐  ← borda colorida (10px)
│                                 │
│     [LOGO PY DIÁRIO]            │  ← topo centralizado, h=110px
│                                 │
│                                 │
│         FOTO DE FUNDO           │
│         (full bleed)            │
│                                 │
│─────────────── overlay bottom ──│  ← gradiente escuro começa
│                                 │
│  [TAG CATEGORIA]                │  ← 90px do fundo
│  TÍTULO DO POST                 │  ← bold branco
│  EM ATÉ 4 LINHAS                │
└─────────────────────────────────┘  ← 90px do fundo
```

## Overlays

- **Topo (260px):** `rgba(0,0,0,0.85)` → `rgba(0,0,0,0.00)` — protege o logo
- **Base (750px):** `rgba(0,0,0,0.00)` → `rgba(0,0,0,0.97)` — fundo do título

## Tipografia

- **Tag categoria:** Arial Black, 900, 22px, uppercase, letra-spacing 2px
- **Título:** Arial Black, 900, 72px, line-height 1.06, cor #ffffff

## Borda

- **Espessura:** 10px solid
- **Cor:** varia por categoria (ver categorias.yaml)

## Cores por Categoria

| Categoria      | Cor          |
|----------------|--------------|
| POLÍTICA       | #c4170c      |
| ECONOMÍA       | #006B3C      |
| DEPORTES       | #0057A8      |
| VIOLENCIA      | #111111      |
| NEGOCIOS       | #1B3A6B      |
| CULTURA        | #7B2D8B      |
| RURAL          | #4A7C21      |
| ESTILO DE VIDA | #D4850A      |

Texto da tag: sempre #ffffff (branco).

## Logo

- Arquivo: `assets/logos/logo-{categoria}-ready.png`
- Posição: topo, centralizado horizontalmente
- Altura: 110px, largura automática
- Embutido como base64 via render.js (necessário para file:// no Windows)

## Composição da Foto

- O bloco de título + tag ocupa ~400px na base da imagem
- O sujeito principal da foto DEVE estar nos primeiros 950px (área visível)
- Usar `background-position` para ajustar o enquadramento:
  - `center top` — sujeito no topo
  - `center 20%` — sujeito levemente abaixo do topo
  - `center 30%` — sujeito no terço superior (padrão para skylines/paisagens)
  - `center 50%` — centro da foto (cuidado: pode cobrir o sujeito)
