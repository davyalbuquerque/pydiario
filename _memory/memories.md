# Squad Memory: PY Diário

## Estilo de Escrita

## Design Visual

- Usar `background-position: center 30%` para fotos de skyline/paisagem — coloca as construções na área superior e o rio/céu cobre o bloco de título
- Logo deve ser embutido como base64 no render.js — necessário para evitar erros de file:// no Windows com Playwright

## Estrutura de Conteúdo

## Proibições Explícitas

## Técnico (específico do squad)

- Playwright: usar `waitUntil: 'networkidle'` + `waitForTimeout(1500)` para garantir carregamento da foto de fundo via URL externa antes do screenshot
- Logo: ler arquivo `logo-{categoria}-ready.png` de `assets/logos/` e converter para base64 antes de injetar no HTML
